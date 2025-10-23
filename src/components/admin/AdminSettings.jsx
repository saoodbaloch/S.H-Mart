import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [storeInfo, setStoreInfo] = useState({
    name: 'DarazMart',
    email: 'admin@darazmart.com',
    phone: '+92 300 1234567',
    address: '123 Main Street, Karachi, Pakistan',
    description: 'Your trusted online shopping platform'
  });

  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin User',
    email: 'admin@darazmart.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#FF6600',
    secondaryColor: '#000000',
    accentColor: '#FFD580'
  });

  // ✅ Fixed — no TypeScript syntax
  const handleStoreUpdate = (e) => {
    e.preventDefault();
    toast.success('Store information updated successfully!');
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (adminProfile.newPassword && adminProfile.newPassword !== adminProfile.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    toast.success('Admin profile updated successfully!');
  };

  const handleThemeUpdate = (e) => {
    e.preventDefault();
    toast.success('Theme settings updated successfully!');
  };

  return (
    <div className="space-y-6">
      <h2>Settings</h2>

      <Tabs defaultValue="store">
        <TabsList>
          <TabsTrigger value="store">Store Info</TabsTrigger>
          <TabsTrigger value="profile">Admin Profile</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        {/* Store Info */}
        <TabsContent value="store">
          <Card className="p-6">
            <h3 className="mb-6">Store Information</h3>
            <form onSubmit={handleStoreUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Store Name</Label>
                  <Input
                    value={storeInfo.name}
                    onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={storeInfo.email}
                    onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input
                    value={storeInfo.phone}
                    onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Address</Label>
                  <Input
                    value={storeInfo.address}
                    onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={storeInfo.description}
                  onChange={(e) => setStoreInfo({ ...storeInfo, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <Label>Store Logo</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="w-24 h-24 bg-[#FF6600] rounded-lg flex items-center justify-center text-white text-2xl">
                    DM
                  </div>
                  <Button type="button" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>

              <Button type="submit" className="bg-[#FF6600] hover:bg-[#FF6600]/90">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* Admin Profile */}
        <TabsContent value="profile">
          <Card className="p-6">
            <h3 className="mb-6">Admin Profile</h3>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={adminProfile.name}
                    onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={adminProfile.email}
                    onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h4 className="mb-4">Change Password</h4>
                <div className="space-y-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input
                      type="password"
                      value={adminProfile.currentPassword}
                      onChange={(e) => setAdminProfile({ ...adminProfile, currentPassword: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>New Password</Label>
                      <Input
                        type="password"
                        value={adminProfile.newPassword}
                        onChange={(e) => setAdminProfile({ ...adminProfile, newPassword: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label>Confirm Password</Label>
                      <Input
                        type="password"
                        value={adminProfile.confirmPassword}
                        onChange={(e) => setAdminProfile({ ...adminProfile, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="bg-[#FF6600] hover:bg-[#FF6600]/90">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* Theme Settings */}
        <TabsContent value="theme">
          <Card className="p-6">
            <h3 className="mb-6">Theme Customization</h3>
            <form onSubmit={handleThemeUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Primary Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={themeSettings.primaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                      className="w-20 h-12"
                    />
                    <Input
                      type="text"
                      value={themeSettings.primaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label>Secondary Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={themeSettings.secondaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                      className="w-20 h-12"
                    />
                    <Input
                      type="text"
                      value={themeSettings.secondaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label>Accent Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={themeSettings.accentColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, accentColor: e.target.value })}
                      className="w-20 h-12"
                    />
                    <Input
                      type="text"
                      value={themeSettings.accentColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, accentColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600 mb-4">Preview:</p>
                <div className="flex gap-4">
                  <div
                    className="w-24 h-24 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: themeSettings.primaryColor }}
                  >
                    Primary
                  </div>
                  <div
                    className="w-24 h-24 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: themeSettings.secondaryColor }}
                  >
                    Secondary
                  </div>
                  <div
                    className="w-24 h-24 rounded-lg flex items-center justify-center text-gray-800"
                    style={{ backgroundColor: themeSettings.accentColor }}
                  >
                    Accent
                  </div>
                </div>
              </div>

              <Button type="submit" className="bg-[#FF6600] hover:bg-[#FF6600]/90">
                <Save className="w-4 h-4 mr-2" />
                Save Theme
              </Button>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
