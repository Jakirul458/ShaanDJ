// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { useToast } from "@/hooks/use-toast";
// import { getAlbums, createOrder, captureOrder } from "@/lib/api";
// import AlbumCard from "@/components/AlbumCard";
// import PaypalButton from "@/components/PaypalButton";
// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingCart, User, LogOut } from "lucide-react";

// type Album = {
//   _id: string;
//   title: string;
//   description: string;
//   duration: string;
//   price: number;
//   image: string;
//   driveFileId: string;
//   createdAt: string;
// };

// const Albums = () => {
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [buyLoading, setBuyLoading] = useState(false);
//   const [showPaypal, setShowPaypal] = useState(false);
//   const [currentOrder, setCurrentOrder] = useState<{ paypalOrderId: string; dbOrderId: string } | null>(null);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;

//   useEffect(() => {
//     fetchAlbums();
//   }, []);

//   const fetchAlbums = async () => {
//     try {
//       const response = await getAlbums();
//       if (response.success) {
//         setAlbums(response.data);
//       }
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to load albums"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBuy = async (albumId: string) => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     setBuyLoading(true);
//     try {
//       const response = await createOrder(albumId);
//       if (response.success) {
//         setCurrentOrder({
//           paypalOrderId: response.data.paypalOrderId,
//           dbOrderId: response.data.dbOrderId
//         });
//         setShowPaypal(true);
//       }
//     } catch (error: any) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: error.response?.data?.message || "Failed to create order"
//       });
//     } finally {
//       setBuyLoading(false);
//     }
//   };

//   const handlePaypalApprove = async (data: any) => {
//     try {
//       const response = await captureOrder(data.orderID);
//       if (response.success) {
//         toast({
//           title: "Success",
//           description: "Payment successful! Album purchased."
//         });
//         setShowPaypal(false);
//         setCurrentOrder(null);
//         navigate("/purchases");
//       }
//     } catch (error: any) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Payment capture failed"
//       });
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Loading albums...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted">
//       {/* Header */}
//       <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Music Store</h1>
          
//           <div className="flex items-center gap-4">
//             {user ? (
//               <>
//                 <span className="text-sm text-muted-foreground">
//                   Welcome, {user.name}
//                 </span>
//                 <Button variant="outline" asChild>
//                   <Link to="/purchases">
//                     <ShoppingCart className="w-4 h-4 mr-2" />
//                     My Purchases
//                   </Link>
//                 </Button>
//                 <Button variant="ghost" onClick={handleLogout}>
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <div className="flex gap-2">
//                 <Button variant="outline" asChild>
//                   <Link to="/login">Login</Link>
//                 </Button>
//                 <Button asChild>
//                   <Link to="/register">Register</Link>
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold mb-2">Available Albums</h2>
//           <p className="text-muted-foreground">
//             Discover and purchase high-quality music albums
//           </p>
//         </div>

//         {albums.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-muted-foreground">No albums available at the moment.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {albums.map((album) => (
//               <AlbumCard
//                 key={album._id}
//                 album={album}
//                 onBuy={handleBuy}
//                 loading={buyLoading}
//               />
//             ))}
//           </div>
//         )}
//       </main>

//       {/* PayPal Dialog */}
//       <Dialog open={showPaypal} onOpenChange={setShowPaypal}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Complete Payment</DialogTitle>
//             <DialogDescription>
//               Please complete your payment using PayPal to purchase the album.
//             </DialogDescription>
//           </DialogHeader>
          
//           <div className="py-4">
//             {currentOrder && (
//               <PaypalButton
//                 orderId={currentOrder.paypalOrderId}
//                 onApprove={handlePaypalApprove}
//                 onError={(error) => {
//                   console.error("PayPal error:", error);
//                   toast({
//                     variant: "destructive",
//                     title: "Payment Error",
//                     description: "There was an issue with PayPal. Please try again."
//                   });
//                 }}
//                 onCancel={() => {
//                   setShowPaypal(false);
//                   setCurrentOrder(null);
//                 }}
//               />
//             )}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Albums;









// import { useEffect, useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
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

// const Albums = () => {
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const albumsPerPage = 8;

//   // Fetch albums
//   const fetchAlbums = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/albums"); // ✅ backend path

//       console.log("API response:", res.data);

//       const albumsData = res.data.data || res.data.albums || [];
//       setAlbums(albumsData);
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Failed to load albums.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAlbums();
//   }, []);

//   // Filter by search
//   const filteredAlbums = albums.filter(
//     (album) =>
//       album.title.toLowerCase().includes(search.toLowerCase()) ||
//       album.description.toLowerCase().includes(search.toLowerCase())
//   );

//   // Pagination
//   const indexOfLastAlbum = currentPage * albumsPerPage;
//   const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
//   const currentAlbums = filteredAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);
//   const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="pt-20 pb-16">
//         <div className="container mx-auto px-4">
//           {/* Page Title */}
//           <div className="text-center mb-10">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">
//               <span className="text-foreground">All</span>{" "}
//               <span className="text-neon animate-glow">Albums</span>
//             </h1>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Explore my collection of mashups across different languages and vibes.
//             </p>
//           </div>

//           {/* Search Bar */}
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold">💿 Albums</h2>
//             <div className="relative w-64">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Search by title or description..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="pl-10"
//               />
//             </div>
//           </div>

//           {/* Album Grid */}
//           {loading ? (
//             <p className="text-muted-foreground">Loading albums...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : currentAlbums.length === 0 ? (
//             <p className="text-muted-foreground">No albums found.</p>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {currentAlbums.map((album) => (
//                   <Card
//                     key={album._id}
//                     className="overflow-hidden border border-primary/20 hover:shadow-lg transition"
//                   >
//                     <img
//                       src={album.image}
//                       alt={album.title}
//                       className="w-full h-40 object-cover"
//                     />
//                     <CardContent className="p-4">
//                       <h3 className="font-bold text-lg">{album.title}</h3>
//                       <p className="text-sm text-muted-foreground mb-2">{album.description}</p>
//                       <p className="text-sm">Duration: {album.duration}</p>
//                       <p className="text-sm font-semibold">Price: ${album.price}</p>
//                       <Button className="mt-3 w-full">Buy Now</Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="flex justify-center items-center gap-2 mt-6">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage((prev) => prev - 1)}
//                 >
//                   Previous
//                 </Button>

//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <Button
//                     key={i + 1}
//                     size="sm"
//                     variant={currentPage === i + 1 ? "default" : "outline"}
//                     onClick={() => setCurrentPage(i + 1)}
//                   >
//                     {i + 1}
//                   </Button>
//                 ))}

//                 <Button
//                   variant="outline"
//                   size="sm"
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage((prev) => prev + 1)}
//                 >
//                   Next
//                 </Button>
//               </div>
//             </>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Albums;







// import { useEffect, useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
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

// const Albums = () => {
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [processingOrder, setProcessingOrder] = useState<string | null>(null); // Track which album is being processed
//   const albumsPerPage = 8;

//   const handleBuy = async (albumId: string) => {
//   const res = await api.post("/orders/create", { albumId });
//   if (res.data.success) {
//     window.location.href = res.data.data.approvalUrl; // Go to PayPal
//   }
// };

//   // Fetch albums
//   const fetchAlbums = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/albums"); // ✅ backend path

//       console.log("API response:", res.data);

//       const albumsData = res.data.data || res.data.albums || [];
//       setAlbums(albumsData);
//     } catch (err: unknown) {
//       setError(err?.response?.data?.message || "Failed to load albums.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create PayPal order and redirect to approval URL
//   const createOrder = async (albumId: string) => {
//     try {
//       setProcessingOrder(albumId); // Show loading state for this specific album
//       const res = await api.post("/orders/create", { albumId });
//       const approvalUrl = res.data.data.approvalUrl; // PayPal approval link
      
//       // Redirect user to PayPal for payment
//       window.location.href = approvalUrl;
//     } catch (err: unknown) {
//       console.error("Order creation failed:", err);
//       alert(err?.response?.data?.message || "Failed to create order. Please try again.");
//     } finally {
//       setProcessingOrder(null); // Reset loading state
//     }
//   };

//   useEffect(() => {
//     fetchAlbums();
//   }, []);

//   // Filter by search
//   const filteredAlbums = albums.filter(
//     (album) =>
//       album.title.toLowerCase().includes(search.toLowerCase()) ||
//       album.description.toLowerCase().includes(search.toLowerCase())
//   );

//   // Pagination
//   const indexOfLastAlbum = currentPage * albumsPerPage;
//   const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
//   const currentAlbums = filteredAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);
//   const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="pt-20 pb-16">
//         <div className="container mx-auto px-4">
//           {/* Page Title */}
//           <div className="text-center mb-10">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">
//               <span className="text-foreground">All</span>{" "}
//               <span className="text-neon animate-glow">Albums</span>
//             </h1>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Explore my collection of mashups across different languages and vibes.
//             </p>
//           </div>

//           {/* Search Bar */}
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold">💿 Albums</h2>
//             <div className="relative w-64">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Search by title or description..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="pl-10"
//               />
//             </div>
//           </div>

//           {/* Album Grid */}
//           {loading ? (
//             <p className="text-muted-foreground">Loading albums...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : currentAlbums.length === 0 ? (
//             <p className="text-muted-foreground">No albums found.</p>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {currentAlbums.map((album) => (
//                   <Card
//                     key={album._id}
//                     className="overflow-hidden border border-primary/20 hover:shadow-lg transition"
//                   >
//                     <img
//                       src={album.image}
//                       alt={album.title}
//                       className="w-full h-40 object-cover"
//                     />
//                     <CardContent className="p-4">
//                       <h3 className="font-bold text-lg">{album.title}</h3>
//                       <p className="text-sm text-muted-foreground mb-2">{album.description}</p>
//                       <p className="text-sm">Duration: {album.duration}</p>
//                       <p className="text-sm font-semibold">Price: ${album.price}</p>
//                       <Button 
//                         className="mt-3 w-full"
//                         onClick={() => createOrder(album._id)}
//                         disabled={processingOrder === album._id}
//                       >
//                         {processingOrder === album._id ? "Processing..." : "Buy Now"}
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="flex justify-center items-center gap-2 mt-6">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage((prev) => prev - 1)}
//                 >
//                   Previous
//                 </Button>

//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <Button
//                     key={i + 1}
//                     size="sm"
//                     variant={currentPage === i + 1 ? "default" : "outline"}
//                     onClick={() => setCurrentPage(i + 1)}
//                   >
//                     {i + 1}
//                   </Button>
//                 ))}

//                 <Button
//                   variant="outline"
//                   size="sm"
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage((prev) => prev + 1)}
//                 >
//                   Next
//                 </Button>
//               </div>
//             </>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Albums;



//--------------------------------------------------------------------------------


// import { useEffect, useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
// import api from "@/lib/api";

// type Album = {
//   _id: string;
//   title: string;
//   description: string;
//   duration: string;
//   price: number | string; // allow string for possible "$" values
//   image: string;
//   driveFileId: string;
// };

// const Albums = () => {
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [processingOrder, setProcessingOrder] = useState<string | null>(null);
//   const albumsPerPage = 8;

//   // Fetch albums
//   const fetchAlbums = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/albums");
//       const albumsData = res.data.data || res.data.albums || [];
//       setAlbums(albumsData);
//     } catch (err: unknown) {
//       setError(err?.response?.data?.message || "Failed to load albums.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create PayPal order and redirect to approval URL
//   const createOrder = async (albumId: string) => {
//     try {
//       setProcessingOrder(albumId);
//       const res = await api.post("/orders/create", { albumId });
//       const approvalUrl = res.data.data.approvalUrl;
//       window.location.href = approvalUrl;
//     } catch (err: unknown) {
//       console.error("Order creation failed:", err);
//       alert(err?.response?.data?.message || "Failed to create order. Please try again.");
//     } finally {
//       setProcessingOrder(null);
//     }
//   };

//   useEffect(() => {
//     fetchAlbums();
//   }, []);

//   // Filter by search
//   const filteredAlbums = albums.filter(
//     (album) =>
//       album.title.toLowerCase().includes(search.toLowerCase()) ||
//       album.description.toLowerCase().includes(search.toLowerCase())
//   );

//   // Pagination
//   const indexOfLastAlbum = currentPage * albumsPerPage;
//   const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
//   const currentAlbums = filteredAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);
//   const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="pt-20 pb-16">
//         <div className="container mx-auto px-4">
//           {/* Page Title */}
//           <div className="text-center mb-10">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">
//               <span className="text-foreground">All</span>{" "}
//               <span className="text-neon animate-glow">Albums</span>
//             </h1>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Explore my collection of mashups across different languages and vibes.
//             </p>
//           </div>

//           {/* Search Bar */}
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold">💿 Albums</h2>
//             <div className="relative w-64">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Search by title or description..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="pl-10"
//               />
//             </div>
//           </div>

//           {/* Album Grid */}
//           {loading ? (
//             <p className="text-muted-foreground">Loading albums...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : currentAlbums.length === 0 ? (
//             <p className="text-muted-foreground">No albums found.</p>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {currentAlbums.map((album) => {
//                   // Convert price to INR display
//                   const displayPrice =
//                     typeof album.price === "string"
//                       ? album.price.replace("$", "")
//                       : album.price;

//                   return (
//                     <Card
//                       key={album._id}
//                       className="overflow-hidden border border-primary/20 hover:shadow-lg transition"
//                     >
//                       <img
//                         src={album.image}
//                         alt={album.title}
//                         className="w-full h-40 object-cover"
//                       />
//                       <CardContent className="p-4">
//                         <h3 className="font-bold text-lg">{album.title}</h3>
//                         <p className="text-sm text-muted-foreground mb-2">{album.description}</p>
//                         <p className="text-sm">Duration: {album.duration}</p>
//                         <p className="text-sm font-semibold">Price: ₹{displayPrice}</p>
//                         <Button
//                           className="mt-3 w-full"
//                           onClick={() => createOrder(album._id)}
//                           disabled={processingOrder === album._id}
//                         >
//                           {processingOrder === album._id
//                             ? "Processing..."
//                             : `Buy for ₹${displayPrice}`}
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   );
//                 })}
//               </div>

//               {/* Pagination */}
//               <div className="flex justify-center items-center gap-2 mt-6">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage((prev) => prev - 1)}
//                 >
//                   Previous
//                 </Button>

//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <Button
//                     key={i + 1}
//                     size="sm"
//                     variant={currentPage === i + 1 ? "default" : "outline"}
//                     onClick={() => setCurrentPage(i + 1)}
//                   >
//                     {i + 1}
//                   </Button>
//                 ))}

//                 <Button
//                   variant="outline"
//                   size="sm"
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage((prev) => prev + 1)}
//                 >
//                   Next
//                 </Button>
//               </div>
//             </>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Albums;




//---------------------------------------================================================

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import api from "@/lib/api";

type Album = {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number | string; // allow string for possible "$" values
  image: string;
  driveFileId: string;
};

const Albums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [processingOrder, setProcessingOrder] = useState<string | null>(null);
  const albumsPerPage = 8;

  // Fetch albums
  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const res = await api.get("/albums");
      const albumsData = res.data.data || res.data.albums || [];
      setAlbums(albumsData);
    } catch (err: unknown) {
      setError(err?.response?.data?.message || "Failed to load albums.");
    } finally {
      setLoading(false);
    }
  };

  // Create PayU order
  const createOrder = async (albumId: string) => {
    try {
      setProcessingOrder(albumId);
      const res = await api.post("/orders/create", { albumId });
      const payuData = res.data.data;

      // PayU requires a POST form submission
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://secure.payu.in/_payment"; // PayU payment URL (sandbox/production as per env)

      // Add all required fields
      Object.keys(payuData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = payuData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err: unknown) {
      console.error("Order creation failed:", err);
      alert(err?.response?.data?.message || "Failed to create order. Please try again.");
    } finally {
      setProcessingOrder(null);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  // Filter by search
  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(search.toLowerCase()) ||
      album.description.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = filteredAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);
  const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">All</span>{" "}
              <span className="text-neon animate-glow">Albums</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my collection of mashups across different languages and vibes.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">💿 Albums</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by title or description..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
          </div>

          {/* Album Grid */}
          {loading ? (
            <p className="text-muted-foreground">Loading albums...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : currentAlbums.length === 0 ? (
            <p className="text-muted-foreground">No albums found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentAlbums.map((album) => {
                  const displayPrice =
                    typeof album.price === "string"
                      ? album.price.replace("$", "")
                      : album.price;

                  return (
                    <Card
                      key={album._id}
                      className="overflow-hidden border border-primary/20 hover:shadow-lg transition"
                    >
                      <img
                        src={album.image}
                        alt={album.title}
                        className="w-full h-40 object-cover"
                      />
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg">{album.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{album.description}</p>
                        <p className="text-sm">Duration: {album.duration}</p>
                        <p className="text-sm font-semibold">Price: ₹{displayPrice}</p>
                        <Button
                          className="mt-3 w-full"
                          onClick={() => createOrder(album._id)}
                          disabled={processingOrder === album._id}
                        >
                          {processingOrder === album._id
                            ? "Processing..."
                            : `Buy for ₹${displayPrice}`}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Albums;
