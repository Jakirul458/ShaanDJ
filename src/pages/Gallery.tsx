// import React, { useEffect, useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import api from "@/lib/api";

// type Image = {
//   _id?: string;
//   title: string;
//   description?: string;
//   imageUrl: string;
// };

// const Gallery = () => {
//   const [images, setImages] = useState<Image[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchGallery = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/gallery");
//       // Convert Drive links before saving to state
//       const data: Image[] = (res.data.data || []).map((img: Image) => ({
//         ...img,
//         imageUrl: convertDriveLink(img.imageUrl),
//       }));
//       setImages(data);
//     } catch {
//       setError("Failed to load gallery.");
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

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen py-24 px-4 bg-background">
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-5xl font-extrabold text-center mb-12 text-neon animate-glow">
//             Gallery
//           </h1>

//           {loading ? (
//             <p className="text-center text-muted-foreground">Loading images...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : images.length === 0 ? (
//             <p className="text-center text-muted-foreground">No images found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {images.map((img) => (
//                 <div key={img._id} className="bg-card/50 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:scale-105 transition transform">
//                   <img src={img.imageUrl} alt={img.title} className="w-full h-64 object-cover" />
//                   <div className="p-4">
//                     <h3 className="text-lg font-bold text-foreground">{img.title}</h3>
//                     {img.description && <p className="text-muted-foreground">{img.description}</p>}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Gallery;



//==============================================================================================================================



import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/lib/api";

type Image = {
  _id?: string;
  title: string;
  description?: string;
  imageUrl: string;
};

const Gallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gallery");
      setImages(res.data.data || []);
    } catch {
      setError("Failed to load gallery.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-extrabold text-center mb-12 text-neon animate-glow">
            Gallery
          </h1>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading images...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : images.length === 0 ? (
            <p className="text-center text-muted-foreground">No images found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.map((img) => (
                <div key={img._id} className="bg-card/50 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:scale-105 transition transform">
                  <img src={img.imageUrl} alt={img.title} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-foreground">{img.title}</h3>
                    {img.description && <p className="text-muted-foreground">{img.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
