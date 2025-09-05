
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
  price: number | string;
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

  // PayU environment variables
  const PAYU_KEY = import.meta.env.VITE_PAYU_KEY;
  const PAYU_SALT = import.meta.env.VITE_PAYU_SALT;
  const PAYU_BASE_URL =
    import.meta.env.VITE_NODE_ENV === "production"
      ? import.meta.env.VITE_PAYU_BASE_URL_PROD
      : import.meta.env.VITE_PAYU_BASE_URL_TEST;

  // Fetch albums
  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const res = await api.get("/albums");
      const albumsData = res.data.data || res.data.albums || [];
      setAlbums(albumsData);
    } catch (err) {
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
      form.action = PAYU_BASE_URL;

      Object.keys(payuData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = payuData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("Order creation failed:", err);
      alert(err?.response?.data?.message || "Failed to create order. Please try again.");
    } finally {
      setProcessingOrder(null);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  // Filter and paginate albums
  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(search.toLowerCase()) ||
      album.description.toLowerCase().includes(search.toLowerCase())
  );
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
