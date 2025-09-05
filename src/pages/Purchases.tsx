import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getMyOrders, downloadAlbum } from "@/lib/api";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Clock, Music } from "lucide-react";

type Order = {
  _id: string;
  album: {
    _id: string;
    title: string;
    description: string;
    duration: string;
    price: number;
    image: string;
  };
  createdAt: string;
};

const Purchases = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getMyOrders();
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load purchases"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (albumId: string) => {
    setDownloadLoading(albumId);
    try {
      const response = await downloadAlbum(albumId);
      if (response.success) {
        // Open download URL in new tab
        window.open(response.data.downloadUrl, "_blank");
        toast({
          title: "Download Started",
          description: "Your album download has been initiated."
        });
      }
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Download Error",
        description: error.response?.data?.message || "Failed to download album"
      });
    } finally {
      setDownloadLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading your purchases...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/albums">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Albums
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">My Purchases</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Music Library</h2>
          <p className="text-muted-foreground">
            Access and download your purchased albums
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Music className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No purchases yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't purchased any albums yet. Browse our collection to get started!
              </p>
              <Button asChild>
                <Link to="/albums">Browse Albums</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <Card key={order._id} className="h-full flex flex-col">
                <CardHeader className="p-0">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <img
                      src={order.album.image}
                      alt={order.album.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Owned
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 p-6 flex flex-col">
                  <CardTitle className="text-xl mb-2">{order.album.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                    {order.album.description}
                  </CardDescription>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{order.album.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>${order.album.price}</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground mb-4">
                    Purchased on {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  
                  <Button 
                    onClick={() => handleDownload(order.album._id)}
                    disabled={downloadLoading === order.album._id}
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {downloadLoading === order.album._id ? "Preparing..." : "Download"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Purchases;