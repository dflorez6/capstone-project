//====================
// Controller: Projects
//====================
// Import Dependencies
import asyncHandler from "express-async-handler";
import Project from "../../../models/projectModel.js";
// Image Uploader
import cloudinary from "../../../services/cloudinary.config.js"; // Used when using cloudinary node package instead of multer

//--------------------
// GET
//--------------------
// Action: Index
// Description: List of Projects (Used for SearchProject Page. Filter by companyName, city, province, serviceCategory)
// Route: GET /api/v1/projects
// Access: Public
const getAllProjects = asyncHandler(async (req, res) => {
  // Destructure URL query params (e.g.: /?city=Waterloo)
  const { companyName, serviceCategory, city, province } = req.query;

  // Initializations
  let projects;

  try {
    // Check if query params are provided
    if (companyName || city || province) {
      //-----
      // Query Params: companyName, city & province
      //-----
      projects = await Project.find({
        // Filter the project based on the propertyManager's companyName, city or province (or all if provided)
      })
        .populate([
          {
            path: "propertyManager",
            select: "-password",
            match: {
              $or: [
                { companyName: companyName },
                { "address.city": city },
                { "address.province": province },
              ],
            },
          },
          {
            path: "serviceCategory",
          },
        ])
        .sort({ createdAt: -1 }); // Order DESC

      // Filter out documents where propertyManager is null after population
      projects = projects.filter((project) => project.propertyManager !== null);
    } else if (serviceCategory) {
      //-----
      // Query Params: serviceCategory
      //-----
      // Find projects based on the provided serviceCategory
      projects = await Project.find({
        serviceCategory: serviceCategory, // Expected to receive the serviceCategory ID
      })
        .populate([
          {
            path: "propertyManager",
            select: "-password",
          },
          {
            path: "serviceCategory",
          },
        ])
        .sort({ createdAt: -1 }); // Order DESC
    } else {
      //-----
      // No Query Params: returns all stores
      //-----
      projects = await Project.find()
        .sort({
          createdAt: -1,
        })
        .populate([
          {
            path: "propertyManager",
            select: "-password",
          },
          {
            path: "serviceCategory",
          },
        ]);
    }

    // Returned Stores
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Action: Index
// Description: List of Property Manager's Projects
// Route: GET /api/v1/projects/:propertyManagerId
// Access: Public
const getPropertyManagerProjects = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { propertyManagerId } = req.params;

  try {
    // Fetch Vendor Services with passed param vendorStore
    const projects = await Project.find({ propertyManager: propertyManagerId })
      .sort({
        createdAt: -1,
      })
      .populate([
        {
          path: "propertyManager",
          select: "-password",
        },
        {
          path: "serviceCategory",
        },
      ]);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Action: Show
// Description: Project Detail
// Route: GET /api/v1/projects/:propertyManagerId/:projectId
// Access: Private
const showProject = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { propertyManagerId, projectId } = req.params;

  try {
    // Fetch Project
    const project = await Project.findOne({
      _id: projectId,
      propertyManager: propertyManagerId,
    }).populate([
      {
        path: "propertyManager",
        select: "-password",
      },
      {
        path: "serviceCategory",
      },
    ]);

    // Check if Vendor Service exists
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//--------------------
// POST
//--------------------
// Action: Create
// Description: Create Project
// Route: POST /api/v1/projects/:propertyManagerId
// Access: Private
const createProject = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { propertyManagerId } = req.params;

  // Destructure req.body
  const {
    name,
    description,
    managerEmail,
    managerPhone,
    startDateTime,
    endDateTime,
    serviceCategory,
  } = req.body;

  try {
    // Initialization
    let coverImageData = {};
    // Check if files are being passed in the request object
    if (req.file) {
      // If file is uploaded, access the file URL and publicId from Cloudinary
      coverImageData.url = req.file.path; // The file path will be the Cloudinary URL
      coverImageData.publicId = req.file.filename; // The public ID provided by Cloudinary
    }

    // Create the Project
    const project = await Project.create({
      coverImage: coverImageData,
      name,
      description,
      managerEmail,
      managerPhone,
      startDateTime,
      endDateTime,
      propertyManager: propertyManagerId,
      serviceCategory,
    });

    // Check if Project was created
    if (project) {
      // Response
      res.status(201).json({
        _id: project._id,
        name: project.name,
        coverImage: project.coverImage,
        description: project.description,
        managerEmail: project.managerEmail,
        managerPhone: project.managerPhone,
        startDateTime: project.startDateTime,
        endDateTime: project.endDateTime,
        propertyManager: project.propertyManager,
        serviceCategory: project.serviceCategory,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Project data");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// PUT / PATCH
//--------------------
// Action: Update
// Description: Update Vendor Certificate
// Route: PUT /api/v1/projects/:propertyManagerId/:projectId
// Access: Private
const updateProject = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { propertyManagerId, projectId } = req.params;

  // Fetch Project
  const project = await Project.findOne({
    _id: projectId,
    propertyManager: propertyManagerId,
  }).populate([
    {
      path: "propertyManager",
      select: "-password",
    },
    {
      path: "serviceCategory",
    },
  ]);

  // Check if Project exists
  if (!project) {
    res.status(400); // Bad Request
    throw new Error("Project doesn't exist");
  }

  try {
    // Destructure req.body
    const {
      name,
      description,
      managerEmail,
      managerPhone,
      startDateTime,
      endDateTime,
      serviceCategory,
    } = req.body;

    // Check if Property Manager is the owner of the Project
    if (
      projectId === project._id.toString() &&
      project.propertyManager._id.toString() ===
        req.propertyManager._id.toString()
    ) {
      // Initialization
      let coverImageData = {};

      // Check if a new file is uploaded
      if (req.file) {
        // If a new file is uploaded, delete the old image from Cloudinary
        if (project.coverImage.publicId) {
          await cloudinary.uploader.destroy(project.coverImage.publicId);
        }
        // If file is uploaded (multer), access the file URL and publicId from Cloudinary
        coverImageData.url = req.file.path; // The file path will be the Cloudinary URL
        coverImageData.publicId = req.file.filename; // The public ID provided by Cloudinary
      }

      // Update the Vendor Certificate
      if (name) project.name = name;
      if (description) project.description = description;
      if (managerEmail) project.managerEmail = managerEmail;
      if (managerPhone) project.managerPhone = managerPhone;
      if (startDateTime) project.startDateTime = startDateTime;
      if (endDateTime) project.endDateTime = endDateTime;
      if (serviceCategory) project.serviceCategory = serviceCategory;
      if (req.file) {
        project.coverImage.url = coverImageData.url;
        project.coverImage.publicId = coverImageData.publicId;
      }

      // Save new data
      const updatedProject = await project.save();

      res.status(200).json(updatedProject);

      //
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }

    //
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// DELETE
//--------------------
// Description: Delete Project
// Route: DELETE /api/v1/projects/:propertyManagerId/:projectId
// Access: Private
const deleteProject = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { propertyManagerId, projectId } = req.params;

  try {
    // Fetch Project
    const project = await Project.findOne({
      _id: projectId,
      propertyManager: propertyManagerId,
    }).populate([
      {
        path: "propertyManager",
        select: "-password",
      },
      {
        path: "serviceCategory",
      },
    ]);

    // Check if Project exists
    if (!project) {
      res.status(400); // Bad Request
      throw new Error("Project doesn't exist");
    }

    // Check if Property Manager is the owner of the Project
    if (
      projectId === project._id.toString() &&
      project.propertyManager._id.toString() ===
        req.propertyManager._id.toString()
    ) {
      // Perform delete operation
      await Project.deleteOne({ _id: projectId });

      // Delete the image from Cloudinary
      if (project.coverImage.publicId) {
        await cloudinary.uploader.destroy(project.coverImage.publicId);
      }

      res.status(200).json({ message: "Project deleted successfully" });
    } else {
      res.status(401);
      throw new Error("Not authorized. Not the Project owner.");
    }

    //
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export {
  getAllProjects,
  getPropertyManagerProjects,
  showProject,
  createProject,
  updateProject,
  deleteProject,
};
