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
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function AddNew({ setTookAction }: any) {
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ title: string }>();
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    setActionLoading(true);
    axios
      .post("https://dummyjson.com/products/add", data)
      .then(() => {
        setActionLoading(false);
        setTookAction(true);
        setOpen(false);
        toast("Product Added successfully");
      })
      .catch(() => {
        setActionLoading(false);
      });
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Add New
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
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
                className="col-span-3"
                onChange={(e) => setData({ title: e.target.value })}
                disabled={actionLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAdd} disabled={actionLoading}>
              Add New
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
