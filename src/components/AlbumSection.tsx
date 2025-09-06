import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

interface Album {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number | string;
  image: string;
  driveFileId: string;
}

const AlbumSection = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingOrder, setProcessingOrder] = useState<string | null>(null);

  // PayU environment variables
  const PAYU_BASE_URL =
    import.meta.env.VITE_NODE_ENV === "production"
      ? import.meta.env.VITE_PAYU_BASE_URL_PROD
      : import.meta.env.VITE_PAYU_BASE_URL_TEST;

  useEffect(() => {
    const fetchLatestAlbums = async () => {
      try {
        setLoading(true);
        const response = await api.get("/albums");
        const allAlbums: Album[] = response.data.data || [];
        setAlbums(allAlbums.slice(0, 4)); // latest 4 albums
      } catch (error) {
        console.error("Failed to fetch albums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAlbums();
  }, []);

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

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Latest Releases Albums
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
          Handpicked DJ mashup albums for your vibe
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : albums.length === 0 ? (
          <p className="text-muted-foreground text-center">No albums available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {albums.map((album, index) => {
              const displayPrice =
                typeof album.price === "string"
                  ? album.price.replace("$", "")
                  : album.price;

              return (
                <Card
                  key={album._id}
                  className="group border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-float"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    {/* Album Image */}
                    <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                      <img
                        src={album.image}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-4 text-left">
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {album.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {album.description}
                      </p>
                      <p className="text-xs text-muted-foreground mb-1">
                        Duration: {album.duration}
                      </p>
                      <p className="font-medium text-primary mb-3">
                        ₹{displayPrice}
                      </p>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-lg px-6 py-4 animate-pulse-glow transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                        onClick={() => createOrder(album._id)}
                        disabled={processingOrder === album._id}
                      >
                        {processingOrder === album._id
                          ? "Processing..."
                          : `Download ₹${displayPrice}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-10">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open("/albums", "_self")}
           className="border-primary text-primary hover:bg-primary/10 text-lg px-6 py-4 glow transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            View All Albums
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AlbumSection;
