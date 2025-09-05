// const express = require("express");
// const router = express.Router();
// const Song = require("../models/Song");
// const protect = require("../middleware/auth");

// // Create song
// router.post("/", protect, async (req, res) => {
//   try {
//     const song = await Song.create(req.body);
//     res.json(song);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get all songs
// router.get("/", async (req, res) => {
//   const songs = await Song.find().sort({ createdAt: -1 });
//   res.json(songs);
// });

// // Update song
// router.put("/:id", protect, async (req, res) => {
//   try {
//     const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(song);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Delete song
// router.delete("/:id", protect, async (req, res) => {
//   try {
//     await Song.findByIdAndDelete(req.params.id);
//     res.json({ message: "Song deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;




// const express = require("express");
// const { 
//   createSong, 
//   getAllSongs, 
//   getLatestSongs,  // নতুন function import
//   getSongById, 
//   updateSong, 
//   deleteSong 
// } = require("../controllers/song.controller");
// const protect = require("../middleware/auth"); // If you want to protect routes

// const router = express.Router();

// // Public routes (no authentication needed)
// router.get("/", getAllSongs);                    // GET /api/songs
// router.get("/latest", getLatestSongs);           // GET /api/songs/latest (নতুন route)
// router.get("/:id", getSongById);                 // GET /api/songs/:id

// // Protected routes (authentication required)
// router.post("/", protect, createSong);           // POST /api/songs
// router.put("/:id", protect, updateSong);         // PUT /api/songs/:id
// router.delete("/:id", protect, deleteSong);      // DELETE /api/songs/:id

// module.exports = router;




const express = require("express");
const {
  createSong,
  getAllSongs,
  getLatestSongs,
  getSongById,
  updateSong,
  deleteSong,
} = require("../controllers/song.controller");
const protect = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllSongs);           // Public ----/api/songs
router.get("/latest", getLatestSongs);  // Public ------/api/songs/latest
router.get("/:id", getSongById);        // Public ----/api/songs/:id

router.post("/", protect, createSong);   // Protected-- /api/song
router.put("/:id", protect, updateSong); // Protected --PUT ----/api/songs/:id
router.delete("/:id", protect, deleteSong); // Protected --DELETE---- /api/songs/:id

module.exports = router;
