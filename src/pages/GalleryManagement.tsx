// import React, { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import api from "@/lib/api";

// type Image = {
//   _id?: string;
//   title: string;
//   description?: string;
//   imageUrl: string;
// };

// const GalleryManagement = () => {
//   const [images, setImages] = useState<Image[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [formData, setFormData] = useState<Partial<Image>>({});
//   const [editId, setEditId] = useState<string | null>(null);

//   // Fetch gallery images
//   const fetchGallery = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/gallery");
//       setImages(res.data.data || []);
//     } catch {
//       setError("Failed to fetch images.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   // Convert Google Drive link to direct viewable link
//   const convertDriveLink = (url: string) => {
//     try {
//       let fileId: string | null = null;

//       // Pattern 1: /d/FILE_ID/
//       let match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
//       if (match) fileId = match[1];

//       // Pattern 2: ?id=FILE_ID
//       if (!fileId) {
//         match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
//         if (match) fileId = match[1];
//       }

//       // Pattern 3: /uc?id=FILE_ID
//       if (!fileId) {
//         match = url.match(/\/uc\?id=([a-zA-Z0-9_-]+)/);
//         if (match) fileId = match[1];
//       }

//       return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : url;
//     } catch {
//       return url;
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.title || !formData.imageUrl) {
//       setError("Title and Image URL are required.");
//       return;
//     }

//     const imageUrl = convertDriveLink(formData.imageUrl);

//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       if (editId) {
//         const res = await api.put(`/gallery/${editId}`, { ...formData, imageUrl });
//         setImages(images.map((img) => (img._id === editId ? res.data.data : img)));
//         setSuccess("Image updated successfully!");
//       } else {
//         const res = await api.post("/gallery", { ...formData, imageUrl });
//         setImages([res.data.data, ...images]);
//         setSuccess("Image added successfully!");
//       }

//       setFormData({});
//       setEditId(null);
//     } catch {
//       setError("Failed to save image.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (img: Image) => {
//     setEditId(img._id!);
//     setFormData(img);
//   };

//   const handleDelete = async (id?: string) => {
//     if (!id) return;
//     if (!confirm("Are you sure you want to delete this image?")) return;
//     try {
//       await api.delete(`/gallery/${id}`);
//       setImages(images.filter((i) => i._id !== id));
//       setSuccess("Image deleted successfully!");
//     } catch {
//       alert("Failed to delete image.");
//     }
//   };

//   return (
//     <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-lg p-6">
//       <CardContent>
//         <h2 className="text-xl font-bold mb-4">{editId ? "Edit Image" : "Add New Image"}</h2>

//         {success && <p className="text-green-500 mb-2">{success}</p>}
//         {error && <p className="text-red-500 mb-2">{error}</p>}

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
//           <Input name="title" placeholder="Title" value={formData.title || ""} onChange={handleChange} />
//           <Input name="description" placeholder="Description" value={formData.description || ""} onChange={handleChange} />
//           <Input name="imageUrl" placeholder="Image URL or Google Drive Link" value={formData.imageUrl || ""} onChange={handleChange} />
//           <Button type="submit" disabled={loading}>{editId ? "Update Image" : "Add Image"}</Button>
//         </form>

//         <h3 className="text-lg font-bold mb-2">All Images</h3>
//         {images.length === 0 ? (
//           <p>No images found.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {images.map((img) => (
//               <div key={img._id} className="bg-card/50 p-2 rounded-lg shadow-lg relative">
//                 <img src={img.imageUrl} alt={img.title} className="w-full h-40 object-cover rounded-md" />
//                 <h4 className="font-bold text-foreground mt-2">{img.title}</h4>
//                 {img.description && <p className="text-muted-foreground">{img.description}</p>}
//                 <div className="flex gap-2 mt-2">
//                   <Button size="sm" variant="outline" onClick={() => handleEdit(img)}>Edit</Button>
//                   <Button size="sm" variant="destructive" onClick={() => handleDelete(img._id)}>Delete</Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default GalleryManagement;








////=================================================================================================================================





import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

type Image = {
  _id?: string;
  title: string;
  description?: string;
  imageUrl: string;
};

const GalleryManagement = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState<Partial<Image>>({});
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch gallery images
  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gallery");
      setImages(res.data.data || []);
    } catch {
      setError("Failed to fetch images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Convert Google Drive link to direct viewable link
  const convertDriveLink = (url: string) => {
    try {
      let fileId: string | null = null;

      // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
      let match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) fileId = match[1];

      // https://drive.google.com/open?id=FILE_ID
      if (!fileId) {
        match = url.match(/id=([a-zA-Z0-9_-]+)/);
        if (match && match[1]) fileId = match[1];
      }

      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }

      return url; // fallback for normal image URLs
    } catch {
      return url;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) {
      setError("Title and Image URL are required.");
      return;
    }

    const imageUrl = convertDriveLink(formData.imageUrl);

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editId) {
        await api.put(`/gallery/${editId}`, { ...formData, imageUrl });
        setSuccess("Image updated successfully!");
      } else {
        await api.post("/gallery", { ...formData, imageUrl });
        setSuccess("Image added successfully!");
      }

      setFormData({});
      setEditId(null);
      fetchGallery();
    } catch {
      setError("Failed to save image.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (img: Image) => {
    setEditId(img._id!);
    setFormData(img);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/gallery/${id}`);
      setImages(images.filter((i) => i._id !== id));
    } catch {
      alert("Failed to delete image.");
    }
  };

  return (
    <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-lg p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">{editId ? "Edit Image" : "Add New Image"}</h2>

        {success && <p className="text-green-500 mb-2">{success}</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <Input name="title" placeholder="Title" value={formData.title || ""} onChange={handleChange} />
          <Input name="description" placeholder="Description" value={formData.description || ""} onChange={handleChange} />
          <Input name="imageUrl" placeholder="Image URL or Google Drive link" value={formData.imageUrl || ""} onChange={handleChange} />
          <Button type="submit">{editId ? "Update Image" : "Add Image"}</Button>
        </form>

        <h3 className="text-lg font-bold mb-2">All Images</h3>
        {images.length === 0 ? (
          <p>No images found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img._id} className="bg-card/50 p-2 rounded-lg shadow-lg relative">
                <img src={img.imageUrl} alt={img.title} className="w-full h-40 object-cover rounded-md" />
                <h4 className="font-bold text-foreground mt-2">{img.title}</h4>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(img)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(img._id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GalleryManagement;
