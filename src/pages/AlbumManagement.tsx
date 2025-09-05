import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addAlbum } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Music } from "lucide-react";
import { Link } from "react-router-dom";

const AlbumManagement = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    image: "",
    driveFileId: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const albumData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      const response = await addAlbum(albumData);
      
      if (response.success) {
        toast({
          title: "Success",
          description: "Album added successfully!"
        });
        
        // Reset form
        setFormData({
          title: "",
          description: "",
          duration: "",
          price: "",
          image: "",
          driveFileId: ""
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to add album"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/admin/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Album Management</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5" />
                Add New Album
              </CardTitle>
              <CardDescription>
                Create a new album for sale in the music store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Album Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter album title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration *</Label>
                    <Input
                      id="duration"
                      name="duration"
                      placeholder="e.g., 45:30"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter album description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="9.99"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="driveFileId">Google Drive File ID *</Label>
                    <Input
                      id="driveFileId"
                      name="driveFileId"
                      placeholder="Enter Drive file ID"
                      value={formData.driveFileId}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Album Cover Image URL *</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/album-cover.jpg"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Adding Album..." : "Add Album"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AlbumManagement;