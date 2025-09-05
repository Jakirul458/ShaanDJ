import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { getAlbums, createOrder, captureOrder } from "@/lib/api";
import AlbumCard from "@/components/AlbumCard";
import PaypalButton from "@/components/PaypalButton";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";

type Album = {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  driveFileId: string;
  createdAt: string;
};

const Albums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [buyLoading, setBuyLoading] = useState(false);
  const [showPaypal, setShowPaypal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<{ paypalOrderId: string; dbOrderId: string } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await getAlbums();
      if (response.success) {
        setAlbums(response.data);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load albums"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (albumId: string) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setBuyLoading(true);
    try {
      const response = await createOrder(albumId);
      if (response.success) {
        setCurrentOrder({
          paypalOrderId: response.data.paypalOrderId,
          dbOrderId: response.data.dbOrderId
        });
        setShowPaypal(true);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to create order"
      });
    } finally {
      setBuyLoading(false);
    }
  };

  const handlePaypalApprove = async (data: any) => {
    try {
      const response = await captureOrder(data.orderID);
      if (response.success) {
        toast({
          title: "Success",
          description: "Payment successful! Album purchased."
        });
        setShowPaypal(false);
        setCurrentOrder(null);
        navigate("/purchases");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Payment capture failed"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading albums...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Music Store</h1>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.name}
                </span>
                <Button variant="outline" asChild>
                  <Link to="/purchases">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    My Purchases
                  </Link>
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Available Albums</h2>
          <p className="text-muted-foreground">
            Discover and purchase high-quality music albums
          </p>
        </div>

        {albums.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No albums available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {albums.map((album) => (
              <AlbumCard
                key={album._id}
                album={album}
                onBuy={handleBuy}
                loading={buyLoading}
              />
            ))}
          </div>
        )}
      </main>

      {/* PayPal Dialog */}
      <Dialog open={showPaypal} onOpenChange={setShowPaypal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              Please complete your payment using PayPal to purchase the album.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {currentOrder && (
              <PaypalButton
                orderId={currentOrder.paypalOrderId}
                onApprove={handlePaypalApprove}
                onError={(error) => {
                  console.error("PayPal error:", error);
                  toast({
                    variant: "destructive",
                    title: "Payment Error",
                    description: "There was an issue with PayPal. Please try again."
                  });
                }}
                onCancel={() => {
                  setShowPaypal(false);
                  setCurrentOrder(null);
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Albums;