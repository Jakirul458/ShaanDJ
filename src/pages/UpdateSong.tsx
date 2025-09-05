// import { useState } from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Music } from "lucide-react";
// import api from "@/lib/api";

// const UpdateSong = () => {
//   const [songId, setSongId] = useState("");
//   const [song, setSong] = useState({
//     title: "",
//     duration: "",
//     lang: "",
//     link: ""
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setSong(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await api.put(`/songs/${songId}`, song, { withCredentials: true });
//       if (res.data.success) {
//         setSuccess("✅ Song updated successfully!");
//         setError("");
//       } else {
//         setError(res.data.message || "Failed to update song.");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">

//       <main className="pt-20 pb-16">
//         <div className="container mx-auto px-4">
//           <div className="min-h-[80vh] flex items-center justify-center">
//             <Card className="max-w-lg w-full bg-card/30 backdrop-blur-sm border-primary/20">
//               <CardContent className="p-8">
//                 {/* Header */}
//                 <div className="text-center mb-8">
//                   <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
//                     <Music className="h-10 w-10 text-primary" />
//                   </div>
//                   <h1 className="text-3xl font-bold mb-2">
//                     <span className="text-neon animate-glow">Update</span>{" "}
//                     <span className="text-foreground">Song</span>
//                   </h1>
//                   <p className="text-muted-foreground">Modify existing track details</p>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {error && <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg"><p className="text-destructive">{error}</p></div>}
//                   {success && <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg"><p className="text-green-600">{success}</p></div>}

//                   <Input
//                     type="text"
//                     name="songId"
//                     value={songId}
//                     onChange={(e) => setSongId(e.target.value)}
//                     placeholder="Song ID"
//                     required
//                   />
//                   <Input
//                     type="text"
//                     name="title"
//                     value={song.title}
//                     onChange={handleChange}
//                     placeholder="New Title"
//                   />
//                   <Input
//                     type="text"
//                     name="duration"
//                     value={song.duration}
//                     onChange={handleChange}
//                     placeholder="New Duration"
//                   />
//                   <Input
//                     type="text"
//                     name="lang"
//                     value={song.lang}
//                     onChange={handleChange}
//                     placeholder="New Language"
//                   />
//                   <Input
//                     type="text"
//                     name="link"
//                     value={song.link}
//                     onChange={handleChange}
//                     placeholder="New YouTube Link"
//                   />

//                   <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 animate-pulse-glow">
//                     Update Song
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>
    
//     </div>
//   );
// };

// export default UpdateSong;










import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import api from "@/lib/api";

type Song = {
  _id: string;
  title: string;
  duration: string;
  lang: string;
  link: string;
};

const ManageSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<Partial<Song>>({});
  const [editSongId, setEditSongId] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10;

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/songs");
      setSongs(res.data.data || []);
    } catch {
      setError("Failed to fetch songs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.duration || !formData.lang || !formData.link) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editSongId) {
        await api.put(`/songs/${editSongId}`, formData);
        setSuccess("Song updated successfully!");
      } else {
        await api.post("/songs", formData);
        setSuccess("Song added successfully!");
      }

      setFormData({});
      setEditSongId(null);
      fetchSongs();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save song.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (song: Song) => {
    setEditSongId(song._id);
    setFormData(song);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this song?")) return;
    try {
      await api.delete(`/songs/${id}`);
      setSongs((prev) => prev.filter((s) => s._id !== id));
    } catch {
      alert("Failed to delete song.");
    }
  };

  // Pagination logic
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(songs.length / songsPerPage);

  return (
    <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-lg">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">{editSongId ? "Edit Song" : "Add New Song"}</h2>

        {success && <p className="text-green-500 mb-2">{success}</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <Input name="title" placeholder="Title" value={formData.title || ""} onChange={handleChange} />
          <Input name="duration" placeholder="Duration" value={formData.duration || ""} onChange={handleChange} />
          <Input name="lang" placeholder="Language" value={formData.lang || ""} onChange={handleChange} />
          <Input name="link" placeholder="YouTube Link" value={formData.link || ""} onChange={handleChange} />

          <Button type="submit" disabled={loading}>
            {loading ? (editSongId ? "Updating..." : "Uploading...") : editSongId ? "Update Song" : "Add Song"}
          </Button>
        </form>

        <h3 className="text-lg font-bold mb-2">All Songs</h3>
        {loading ? (
          <p>Loading songs...</p>
        ) : currentSongs.length === 0 ? (
          <p>No songs found.</p>
        ) : (
          <>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border-b">Title</th>
                  <th className="p-2 border-b">Duration</th>
                  <th className="p-2 border-b">Language</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSongs.map((song) => (
                  <tr key={song._id} className="hover:bg-primary/5">
                    <td className="p-2 border-b">{song.title}</td>
                    <td className="p-2 border-b">{song.duration}</td>
                    <td className="p-2 border-b">{song.lang}</td>
                    <td className="p-2 border-b flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(song)}>
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(song._id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-4">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  size="sm"
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ManageSongs;
