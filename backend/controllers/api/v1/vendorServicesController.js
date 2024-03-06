//====================
// Controller: Vendor Services
//====================
// Import Dependencies
import asyncHandler from "express-async-handler";
import VendorService from "../../../models/vendorServiceModel.js";
import { populate } from "dotenv";

//--------------------
// GET
//--------------------
// Action: Index
// Description: List of Vendor Services
// Route: GET /api/v1/vendor-services
// Access: Public
const getAllVendorServices = asyncHandler(async (req, res) => {
  try {
    const vendorServices = await VendorService.find().sort({ name: 1 }); // TODO: DB - To get order by DESC use -1
    res.status(200).json(vendorServices);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Action: Show
// Description: Vendor Service Detail
// Route: GET /api/v1/vendor-services/:vendorStore/:serviceId
// Access: Private
const showVendorService = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { vendorStore, serviceId } = req.params;

  try {
    // Fetch Vendor Service
    const vendorService = await VendorService.findOne({
      _id: serviceId,
      vendorStore,
    }).populate([
      {
        path: "serviceCategory",
      },
      // TODO: Uncomment in case that I need the returned object to include data from the vendorStore
      /*
    {
      path: "vendorStore",
    },
    */
    ]);

    // Check if Vendor Service exists
    if (!vendorService) {
      res.status(404);
      throw new Error("Vendor Service not found");
    }

    res.status(200).json(vendorService);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//--------------------
// POST
//--------------------
// Action: Create
// Description: Create Vendor Service
// Route: GET /api/v1/vendor-services
// Access: Private
const createVendorService = asyncHandler(async (req, res) => {
  // Destructure req.body
  const {
    name,
    description,
    yearsExperience,
    costHour,
    serviceCategory,
    vendorStore,
  } = req.body;

  try {
    // Create the Vendor Service
    const vendorService = await VendorService.create({
      name,
      description,
      yearsExperience,
      costHour,
      vendorStore,
      serviceCategory,
    });

    // Check if Vendor Store was created
    if (vendorService) {
      // Response
      res.status(201).json({
        _id: vendorService._id,
        name: vendorService.name,
        description: vendorService.description,
        yearsExperience: vendorService.yearsExperience,
        lastName: vendorService.lastName,
        costHour: vendorService.costHour,
        vendorStore: vendorService.vendorStore,
        serviceCategory: vendorService.serviceCategory,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Vendor Service data");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.status(200).json({ message: "Vendor Service - Create" });
});

//--------------------
// PUT / PATCH
//--------------------
// Action: Update
// Description: Update Vendor Service
// Route: PUT /api/v1/vendor-services/:vendorStore/:serviceId
// Access: Private
const updateVendorService = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { vendorStore, serviceId } = req.params;

  // Fetch Vendor Service
  const vendorService = await VendorService.findOne({
    _id: serviceId,
    vendorStore,
  }).populate([
    {
      path: "serviceCategory",
    },
    {
      path: "vendorStore",
      select: "storeOwner", // To exclude a field from the query '-fieldName'
    },
  ]);

  // Check if Vendor Service exists
  if (!vendorService) {
    res.status(400); // Bad Request
    throw new Error("Vendor Service doesn't exist");
  }

  try {
    // Check if passed req.param vendorStore id === fetched vendorService vendorStore id
    // AND fetched vendorService storeOwner id === authenticated vendor id
    if (
      vendorStore === vendorService.vendorStore._id.toString() &&
      vendorService.vendorStore.storeOwner.toString() ==
        req.vendor._id.toString()
    ) {
      // Destructure body request
      const { name, description, yearsExperience, costHour, serviceCategory } =
        req.body;

      // Update the Vendor Service
      if (name) vendorService.name = name;
      if (description) vendorService.description = description;
      if (yearsExperience) vendorService.yearsExperience = yearsExperience;
      if (costHour) vendorService.costHour = costHour;
      if (serviceCategory) vendorService.serviceCategory = serviceCategory;

      // Save new data
      const updatedVendorService = await vendorService.save();

      res.status(200).json(updatedVendorService);
    } else {
      res.status(401);
      throw new Error("Not authorized. Not the Store owner.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// DELETE
//--------------------
// Description: Delete Vendor Service
// Route: DELETE /api/v1/vendor-services/:vendorStore/:serviceId
// Access: Private
const deleteVendorService = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { vendorStore, serviceId } = req.params;

  try {
    // Fetch Vendor Service
    const vendorService = await VendorService.findOne({
      _id: serviceId,
      vendorStore,
    }).populate([
      {
        path: "vendorStore",
        select: "storeOwner", // To exclude a field from the query '-fieldName'
      },
    ]);

    // Check if Vendor Service exists
    if (!vendorService) {
      res.status(400); // Bad Request
      throw new Error("Vendor Service doesn't exist");
    }

    // Check if passed req.param vendorStore id === fetched vendorService vendorStore id
    // AND fetched vendorService storeOwner id === authenticated vendor id
    if (
      vendorStore === vendorService.vendorStore._id.toString() &&
      vendorService.vendorStore.storeOwner.toString() ==
        req.vendor._id.toString()
    ) {
      // Perform delete operation
      await VendorService.deleteOne({ _id: serviceId });

      res.status(200).json({ message: "Vendor Service deleted successfully" });
    } else {
      res.status(401);
      throw new Error("Not authorized. Not the Store owner.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export {
  getAllVendorServices,
  showVendorService,
  createVendorService,
  updateVendorService,
  deleteVendorService,
};
