// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { addAlbum } from "@/lib/api";
// import { useToast } from "@/hooks/use-toast";
// import { ArrowLeft, Music } from "lucide-react";
// import { Link } from "react-router-dom";

// const AlbumManagement = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     duration: "",
//     price: "",
//     image: "",
//     driveFileId: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const { toast } = useToast();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const albumData = {
//         ...formData,
//         price: parseFloat(formData.price)
//       };

//       const response = await addAlbum(albumData);
      
//       if (response.success) {
//         toast({
//           title: "Success",
//           description: "Album added successfully!"
//         });
        
//         // Reset form
//         setFormData({
//           title: "",
//           description: "",
//           duration: "",
//           price: "",
//           image: "",
//           driveFileId: ""
//         });
//       }
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: error.response?.data?.message || "Failed to add album"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted">
//       {/* Header */}
//       <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container mx-auto px-4 py-4 flex items-center gap-4">
//           <Button variant="ghost" asChild>
//             <Link to="/admin/dashboard">
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Dashboard
//             </Link>
//           </Button>
//           <h1 className="text-2xl font-bold">Album Management</h1>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-2xl mx-auto">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Music className="w-5 h-5" />
//                 Add New Album
//               </CardTitle>
//               <CardDescription>
//                 Create a new album for sale in the music store
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="title">Album Title *</Label>
//                     <Input
//                       id="title"
//                       name="title"
//                       placeholder="Enter album title"
//                       value={formData.title}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="duration">Duration *</Label>
//                     <Input
//                       id="duration"
//                       name="duration"
//                       placeholder="e.g., 45:30"
//                       value={formData.duration}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="description">Description *</Label>
//                   <Textarea
//                     id="description"
//                     name="description"
//                     placeholder="Enter album description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     rows={4}
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="price">Price (USD) *</Label>
//                     <Input
//                       id="price"
//                       name="price"
//                       type="number"
//                       step="0.01"
//                       min="0"
//                       placeholder="9.99"
//                       value={formData.price}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="driveFileId">Google Drive File ID *</Label>
//                     <Input
//                       id="driveFileId"
//                       name="driveFileId"
//                       placeholder="Enter Drive file ID"
//                       value={formData.driveFileId}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="image">Album Cover Image URL *</Label>
//                   <Input
//                     id="image"
//                     name="image"
//                     type="url"
//                     placeholder="https://example.com/album-cover.jpg"
//                     value={formData.image}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <Button type="submit" className="w-full" disabled={loading}>
//                   {loading ? "Adding Album..." : "Add Album"}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AlbumManagement;




// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import api from "@/lib/api";
// import { Input } from "@/components/ui/input";

// type Album = {
//   _id: string;
//   title: string;
//   description: string;
//   duration: string;
//   price: number;
//   image: string;
//   driveFileId: string;
// };

// const AlbumManagement = () => {
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [editAlbumId, setEditAlbumId] = useState<string | null>(null);
//   const [formData, setFormData] = useState<Partial<Album>>({});

//   const fetchAlbums = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/albums");
//       setAlbums(res.data.data || []);
//     } catch (err) {
//       setError("Failed to fetch albums");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAlbums();
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this album?")) return;
//     try {
//       await api.delete(`/albums/${id}`);
//       setAlbums((prev) => prev.filter((a) => a._id !== id));
//     } catch {
//       alert("Failed to delete album");
//     }
//   };

//   const handleEdit = (album: Album) => {
//     setEditAlbumId(album._id);
//     setFormData(album);
//   };

//   const handleUpdate = async () => {
//     try {
//       await api.put(`/albums/${editAlbumId}`, formData);
//       fetchAlbums();
//       setEditAlbumId(null);
//       setFormData({});
//     } catch {
//       alert("Failed to update album");
//     }
//   };

//   return (
//     <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-lg">
//       <CardContent>
//         <h2 className="text-xl font-bold mb-4">Manage Albums</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : albums.length === 0 ? (
//           <p>No albums found.</p>
//         ) : (
//           <table className="w-full text-left border-collapse mb-4">
//             <thead>
//               <tr>
//                 <th className="p-2 border-b">Title</th>
//                 <th className="p-2 border-b">Duration</th>
//                 <th className="p-2 border-b">Price</th>
//                 <th className="p-2 border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {albums.map((album) => (
//                 <tr key={album._id} className="hover:bg-primary/5">
//                   <td className="p-2 border-b">{album.title}</td>
//                   <td className="p-2 border-b">{album.duration}</td>
//                   <td className="p-2 border-b">{album.price}</td>
//                   <td className="p-2 border-b flex gap-2">
//                     <Button size="sm" variant="outline" onClick={() => handleEdit(album)}>
//                       Edit
//                     </Button>
//                     <Button size="sm" variant="destructive" onClick={() => handleDelete(album._id)}>
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {editAlbumId && (
//           <div className="mt-4 flex flex-col gap-2">
//             <Input
//               value={formData.title || ""}
//               placeholder="Title"
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             />
//             <Input
//               value={formData.duration || ""}
//               placeholder="Duration"
//               onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//             />
//             <Input
//               type="number"
//               value={formData.price || ""}
//               placeholder="Price"
//               onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
//             />
//             <Button onClick={handleUpdate}>Update Album</Button>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default AlbumManagement;







// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import api from "@/lib/api";

// type Album = {
//   _id: string;
//   title: string;
//   description: string;
//   duration: string;
//   price: number;
//   image: string;
//   driveFileId: string;
// };

// const ManageAlbums = () => {
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [formData, setFormData] = useState<Partial<Album>>({});
//   const [editAlbumId, setEditAlbumId] = useState<string | null>(null);

//   const fetchAlbums = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/albums");
//       setAlbums(res.data.data || []);
//     } catch {
//       setError("Failed to fetch albums");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAlbums();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.title || !formData.duration || !formData.price || !formData.image || !formData.driveFileId) {
//       setError("All fields are required.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       if (editAlbumId) {
//         // Update
//         await api.put(`/albums/${editAlbumId}`, formData);
//         setSuccess("Album updated successfully!");
//       } else {
//         // Create
//         await api.post("/albums", { ...formData, price: Number(formData.price) });
//         setSuccess("Album created successfully!");
//       }

//       setFormData({});
//       setEditAlbumId(null);
//       fetchAlbums();
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to save album.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (album: Album) => {
//     setEditAlbumId(album._id);
//     setFormData(album);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this album?")) return;
//     try {
//       await api.delete(`/albums/${id}`);
//       setAlbums((prev) => prev.filter((a) => a._id !== id));
//     } catch {
//       alert("Failed to delete album");
//     }
//   };

//   return (
//     <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-lg">
//       <CardContent>
//         <h2 className="text-xl font-bold mb-4">{editAlbumId ? "Edit Album" : "Add New Album"}</h2>

//         {success && <p className="text-green-500 mb-2">{success}</p>}
//         {error && <p className="text-red-500 mb-2">{error}</p>}

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
//           <Input name="title" placeholder="Album Title" value={formData.title || ""} onChange={handleChange} />
//           <Input name="description" placeholder="Description" value={formData.description || ""} onChange={handleChange} />
//           <Input name="duration" placeholder="Duration (e.g., 45:30)" value={formData.duration || ""} onChange={handleChange} />
//           <Input name="price" type="number" placeholder="Price (USD)" value={formData.price || ""} onChange={handleChange} />
//           <Input name="image" placeholder="Album Cover URL" value={formData.image || ""} onChange={handleChange} />
//           <Input name="driveFileId" placeholder="Google Drive File ID" value={formData.driveFileId || ""} onChange={handleChange} />

//           <Button type="submit" disabled={loading}>
//             {loading ? (editAlbumId ? "Updating..." : "Uploading...") : editAlbumId ? "Update Album" : "Upload Album"}
//           </Button>
//         </form>

//         <h3 className="text-lg font-bold mb-2">All Albums</h3>
//         {loading ? (
//           <p>Loading albums...</p>
//         ) : albums.length === 0 ? (
//           <p>No albums found.</p>
//         ) : (
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr>
//                 <th className="p-2 border-b">Title</th>
//                 <th className="p-2 border-b">Duration</th>
//                 <th className="p-2 border-b">Price</th>
//                 <th className="p-2 border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {albums.map((album) => (
//                 <tr key={album._id} className="hover:bg-primary/5">
//                   <td className="p-2 border-b">{album.title}</td>
//                   <td className="p-2 border-b">{album.duration}</td>
//                   <td className="p-2 border-b">{album.price}</td>
//                   <td className="p-2 border-b flex gap-2">
//                     <Button size="sm" variant="outline" onClick={() => handleEdit(album)}>
//                       Edit
//                     </Button>
//                     <Button size="sm" variant="destructive" onClick={() => handleDelete(album._id)}>
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ManageAlbums;








import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

type Album = {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  driveFileId: string;
};

const ManageAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<Partial<Album>>({});
  const [editAlbumId, setEditAlbumId] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 5;

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const res = await api.get("/albums");
      setAlbums(res.data.data || []);
    } catch {
      setError("Failed to fetch albums");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.duration || !formData.price || !formData.image || !formData.driveFileId) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editAlbumId) {
        await api.put(`/albums/${editAlbumId}`, formData);
        setSuccess("Album updated successfully!");
      } else {
        await api.post("/albums", { ...formData, price: Number(formData.price) });
        setSuccess("Album created successfully!");
      }

      setFormData({});
      setEditAlbumId(null);
      fetchAlbums();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save album.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (album: Album) => {
    setEditAlbumId(album._id);
    setFormData(album);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this album?")) return;
    try {
      await api.delete(`/albums/${id}`);
      setAlbums((prev) => prev.filter((a) => a._id !== id));
    } catch {
      alert("Failed to delete album");
    }
  };

  // Pagination logic
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
  const totalPages = Math.ceil(albums.length / albumsPerPage);

  return (
    <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-lg">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">{editAlbumId ? "Edit Album" : "Add New Album"}</h2>

        {success && <p className="text-green-500 mb-2">{success}</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <Input name="title" placeholder="Album Title" value={formData.title || ""} onChange={handleChange} />
          <Input name="description" placeholder="Description" value={formData.description || ""} onChange={handleChange} />
          <Input name="duration" placeholder="Duration (e.g., 45:30)" value={formData.duration || ""} onChange={handleChange} />
          <Input name="price" type="number" placeholder="Price (USD)" value={formData.price || ""} onChange={handleChange} />
          <Input name="image" placeholder="Album Cover URL" value={formData.image || ""} onChange={handleChange} />
          <Input name="driveFileId" placeholder="Google Drive File ID" value={formData.driveFileId || ""} onChange={handleChange} />

          <Button type="submit" disabled={loading}>
            {loading ? (editAlbumId ? "Updating..." : "Uploading...") : editAlbumId ? "Update Album" : "Upload Album"}
          </Button>
        </form>

        <h3 className="text-lg font-bold mb-2">All Albums</h3>
        {loading ? (
          <p>Loading albums...</p>
        ) : currentAlbums.length === 0 ? (
          <p>No albums found.</p>
        ) : (
          <>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border-b">Title</th>
                  <th className="p-2 border-b">Duration</th>
                  <th className="p-2 border-b">Price</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAlbums.map((album) => (
                  <tr key={album._id} className="hover:bg-primary/5">
                    <td className="p-2 border-b">{album.title}</td>
                    <td className="p-2 border-b">{album.duration}</td>
                    <td className="p-2 border-b">{album.price}</td>
                    <td className="p-2 border-b flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(album)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(album._id)}>
                        Delete
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

export default ManageAlbums;
