import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductActions({
  product,
  setTookAction,
}: {
  product: Product;
  setTookAction: any;
}) {
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ title: string }>();
  const [open, setOpen] = useState(false);

  const handleUpdate = () => {
    setActionLoading(true);
    axios
      .put(`https://dummyjson.com/products/${product.id}`, data)
      .then(() => {
        setActionLoading(false);
        setOpen(false);
        setTookAction(true);
        toast("Product updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        setActionLoading(false);
      });
  };

  const handleDelete = () => {
    setActionLoading(true);
    axios
      .delete(`https://dummyjson.com/products/${product.id}`)
      .then(() => {
        setActionLoading(false);
        setOpen(false);
        setTookAction(true);
        toast("Product deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        setActionLoading(false);
      });
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Pencil size={16} />
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to your product here. Click save when you&#39re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                defaultValue={product.title}
                className="col-span-3"
                onChange={(e) => setData({ title: e.target.value })}
                disabled={actionLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleUpdate}
              disabled={actionLoading}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button onClick={handleDelete} disabled={actionLoading}>
        <Trash size={16} />
      </Button>
    </>
  );
}
