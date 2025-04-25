"use client"

import type React from "react"

import { useState } from "react"
import type { Locale } from "@/lib/i18n-config"
import { Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageUpload } from "@/components/image-upload"
import { EquipmentCard, type EquipmentItem } from "@/components/equipment-card"
import type { LocationGovernorate } from "@/components/location-dropdown"
import type { EquipmentCategory } from "@/components/equipment-category-dropdown"

interface EquipmentManagementProps {
  equipment: EquipmentItem[]
  dict: {
    myEquipment: string
    addEquipment: string
    edit: string
    delete: string
    dailyRate: string
    available: string
    unavailable: string
    viewDetails: string
  }
  lang: Locale
  locations: LocationGovernorate[]
  categories: EquipmentCategory[]
}

export default function EquipmentManagement({
  equipment,
  dict,
  lang,
  locations,
  categories,
}: EquipmentManagementProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    location: "",
    dailyRate: "",
    weeklyRate: "",
    description: "",
    status: "available",
    images: [] as string[],
  })

  const handleAddEquipment = () => {
    // Reset form data
    setFormData({
      name: "",
      category: "",
      subcategory: "",
      location: "",
      dailyRate: "",
      weeklyRate: "",
      description: "",
      status: "available",
      images: [],
    })
    setShowAddDialog(true)
  }

  const handleEditEquipment = (item: EquipmentItem) => {
    setSelectedEquipment(item)
    // Populate form data with selected equipment
    setFormData({
      name: item.name,
      category: item.category,
      subcategory: item.subcategory || "",
      location: item.location,
      dailyRate: item.dailyRate.toString(),
      weeklyRate: item.weeklyRate?.toString() || "",
      description: "",
      status: item.available ? "available" : "unavailable",
      images: item.images || [item.image],
    })
    setShowEditDialog(true)
  }

  const handleDeleteEquipment = (item: EquipmentItem) => {
    setSelectedEquipment(item)
    setShowDeleteDialog(true)
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImagesChange = (images: string[]) => {
    setFormData((prev) => ({
      ...prev,
      images,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log("Form submitted:", formData)

    // Close dialogs
    setShowAddDialog(false)
    setShowEditDialog(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <div key={item.id} className="relative">
            <EquipmentCard
              equipment={item}
              lang={lang}
              viewLabel={dict.viewDetails}
              availableLabel={dict.available}
              unavailableLabel={dict.unavailable}
              dailyRateLabel={dict.dailyRate}
              weeklyRateLabel={lang === "ar" ? "أسبوعياً" : "Weekly"}
            />
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleEditEquipment(item)}>
                <Edit className="h-4 w-4 mr-2" />
                {dict.edit}
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteEquipment(item)}>
                <Trash2 className="h-4 w-4 mr-2" />
                {dict.delete}
              </Button>
            </CardFooter>
          </div>
        ))}

        <Card className="overflow-hidden border-dashed h-full">
          <div
            className="flex flex-col items-center justify-center h-full p-6 cursor-pointer"
            onClick={handleAddEquipment}
          >
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">{dict.addEquipment}</p>
          </div>
        </Card>
      </div>

      {/* Add Equipment Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{lang === "ar" ? "إضافة معدات جديدة" : "Add New Equipment"}</DialogTitle>
            <DialogDescription>
              {lang === "ar"
                ? "املأ التفاصيل لإضافة معدات جديدة للإيجار."
                : "Fill in the details to add new equipment for rent."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="images">{lang === "ar" ? "صور المعدات" : "Equipment Images"}</Label>
                <ImageUpload images={formData.images} onChange={handleImagesChange} lang={lang} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{lang === "ar" ? "اسم المعدات" : "Equipment Name"}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">{lang === "ar" ? "الفئة" : "Category"}</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleFormChange("category", value)}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder={lang === "ar" ? "اختر الفئة" : "Select category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {lang === "ar" ? category.nameAr : category.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subcategory">{lang === "ar" ? "الفئة الفرعية" : "Subcategory"}</Label>
                  <Input
                    id="subcategory"
                    value={formData.subcategory}
                    onChange={(e) => handleFormChange("subcategory", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">{lang === "ar" ? "الموقع" : "Location"}</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => handleFormChange("location", value)}
                    required
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder={lang === "ar" ? "اختر الموقع" : "Select location"} />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((governorate) => (
                        <SelectGroup key={governorate.id}>
                          <SelectLabel>{lang === "ar" ? governorate.nameAr : governorate.nameEn}</SelectLabel>
                          {governorate.areas.map((area) => (
                            <SelectItem key={area.id} value={area.id}>
                              {lang === "ar" ? area.nameAr : area.nameEn}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="daily-rate">{lang === "ar" ? "السعر اليومي (د.ك)" : "Daily Rate (KWD)"}</Label>
                  <Input
                    id="daily-rate"
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.dailyRate}
                    onChange={(e) => handleFormChange("dailyRate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weekly-rate">{lang === "ar" ? "السعر الأسبوعي (د.ك)" : "Weekly Rate (KWD)"}</Label>
                  <Input
                    id="weekly-rate"
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.weeklyRate}
                    onChange={(e) => handleFormChange("weeklyRate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">{lang === "ar" ? "الحالة" : "Status"}</Label>
                  <Select value={formData.status} onValueChange={(value) => handleFormChange("status", value)} required>
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">{lang === "ar" ? "متاح" : "Available"}</SelectItem>
                      <SelectItem value="unavailable">{lang === "ar" ? "غير متاح" : "Unavailable"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{lang === "ar" ? "الوصف" : "Description"}</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowAddDialog(false)}>
                {lang === "ar" ? "إلغاء" : "Cancel"}
              </Button>
              <Button type="submit">{lang === "ar" ? "إضافة المعدات" : "Add Equipment"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Equipment Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{lang === "ar" ? "تعديل المعدات" : "Edit Equipment"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-images">{lang === "ar" ? "صور المعدات" : "Equipment Images"}</Label>
                <ImageUpload images={formData.images} onChange={handleImagesChange} lang={lang} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">{lang === "ar" ? "اسم المعدات" : "Equipment Name"}</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">{lang === "ar" ? "الفئة" : "Category"}</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleFormChange("category", value)}
                    required
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {lang === "ar" ? category.nameAr : category.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-daily-rate">{lang === "ar" ? "السعر اليومي (د.ك)" : "Daily Rate (KWD)"}</Label>
                  <Input
                    id="edit-daily-rate"
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.dailyRate}
                    onChange={(e) => handleFormChange("dailyRate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-weekly-rate">
                    {lang === "ar" ? "السعر الأسبوعي (د.ك)" : "Weekly Rate (KWD)"}
                  </Label>
                  <Input
                    id="edit-weekly-rate"
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.weeklyRate}
                    onChange={(e) => handleFormChange("weeklyRate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">{lang === "ar" ? "الحالة" : "Status"}</Label>
                  <Select value={formData.status} onValueChange={(value) => handleFormChange("status", value)} required>
                    <SelectTrigger id="edit-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">{lang === "ar" ? "متاح" : "Available"}</SelectItem>
                      <SelectItem value="unavailable">{lang === "ar" ? "غير متاح" : "Unavailable"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowEditDialog(false)}>
                {lang === "ar" ? "إلغاء" : "Cancel"}
              </Button>
              <Button type="submit">{lang === "ar" ? "حفظ التغييرات" : "Save Changes"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Equipment Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{lang === "ar" ? "حذف المعدات" : "Delete Equipment"}</DialogTitle>
            <DialogDescription>
              {lang === "ar"
                ? "هل أنت متأكد أنك تريد حذف هذه المعدات؟ لا يمكن التراجع عن هذا الإجراء."
                : "Are you sure you want to delete this equipment? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              {lang === "ar" ? "إلغاء" : "Cancel"}
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(false)}>
              {lang === "ar" ? "حذف" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
