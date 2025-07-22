const User = require("../Model/Doctor");

// Get all doctors
const getAllUsers = async (req, res, next) => {
    let doctors;

    try {
        doctors = await User.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!doctors || doctors.length === 0) {
        return res.status(404).json({ message: "No doctors found" });
    }

    return res.status(200).json({ doctors });
};

// Add a new doctor
const addDoctors = async (req, res, next) => {
    const { name, email, Speciality, Description, Amount, Phone } = req.body;

    let doctor;

    try {
        doctor = new User({
            name,
            email,
            Speciality,
            Description,
            Amount,
            Phone,
            role: "health_provider" // Default role
        });

        await doctor.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error adding doctor" });
    }

    if (!doctor) {
        return res.status(400).json({ message: "Unable to add doctor" });
    }
    
    return res.status(201).json({ doctor });
};

// Get doctor by ID
const DoctorGetById = async (req, res, next) => {
    const id = req.params.id;
    let doctor;

    try {
        doctor = await User.findById(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json({ doctor });
};

// Update doctor details
const updateDoctorDetails = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, Speciality, Description, Amount, Phone } = req.body;

    let doctor;
    try {
        doctor = await User.findByIdAndUpdate(
            id,
            { name, email, Speciality, Description, Amount, Phone },
            { new: true } // This returns the updated document
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating doctor" });
    }

    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found or unable to update" });
    }

    return res.status(200).json({ doctor });
};

// Delete doctor
const deleteDoctor = async (req, res, next) => {
    const id = req.params.id;
    let doctor;

    try {
        doctor = await User.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error deleting doctor" });
    }

    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found or unable to delete" });
    }

    return res.status(200).json({ message: "Doctor deleted successfully" });
};

// Export functions
exports.getAllUsers = getAllUsers;
exports.addDoctors = addDoctors;
exports.DoctorGetById = DoctorGetById;
exports.updateDoctorDetails = updateDoctorDetails;
exports.deleteDoctor = deleteDoctor;