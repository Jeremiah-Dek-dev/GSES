import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import { UseProducts } from "../../../user/context/ProductContext";
import adminApi from "../../../API/adminApi";

const wine = "#4B0F1C";
const gold = "#D4AF37";

const categories = [
  "Electric Irons",
  "Fans",
  "Wall Lights",
  "Chairs",
  "Electric Cables",
  "Switches",
  "Sockets",
  "Tools",
];

const Add = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setProduct } = UseProducts();
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Wall Lights",
    quantity: 0,
  });

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image")) {
      toast.error("Please upload an image file");
      return;
    }

    setImage(file);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Product image required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value),
      );

      formData.append("image", image);

      const response = await adminApi.post("/api/design/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Product added successfully");

        setData({
          name: "",
          description: "",
          price: "",
          category: "Wall Lights",
          quantity: 0,
        });

        setImage(null);
        const newProduct = response.data.data;
        setProduct((prev) => [...prev, newProduct]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add product", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h5"
          sx={{ mb: 4, fontWeight: "bold", color: wine }}
        >
          Add New Product
        </Typography>

        <form onSubmit={onSubmitHandler}>
          <Grid container spacing={3}>
            {/* IMAGE UPLOAD */}
            <Grid item xs={12}>
              <Box
                sx={{
                  border: `2px dashed ${gold}`,
                  borderRadius: 3,
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": { backgroundColor: "#fafafa" },
                }}
                onClick={() => document.getElementById("product-image").click()}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    style={{
                      height: 160,
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <>
                    <CloudUploadIcon sx={{ fontSize: 40, color: gold }} />
                    <Typography mt={1}>
                      Click or drag image to upload
                    </Typography>
                  </>
                )}

                <input
                  id="product-image"
                  hidden
                  type="file"
                  onChange={(e) => handleImage(e.target.files[0])}
                />
              </Box>
            </Grid>

            {/* NAME */}
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                name="name"
                value={data.name}
                onChange={onchangeHandler}
                fullWidth
                required
              />
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12}>
              <TextField
                label="Product Description"
                name="description"
                value={data.description}
                onChange={onchangeHandler}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>

            {/* CATEGORY */}
            <Grid item xs={12} md={4}>
              <TextField
                select
                label="Category"
                name="category"
                value={data.category}
                onChange={onchangeHandler}
                fullWidth
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* PRICE */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Price"
                type="number"
                name="price"
                value={data.price}
                onChange={onchangeHandler}
                fullWidth
                inputProps={{
                  min: 5,
                  max: 50000,
                  step: 1,
                }}
              />
            </Grid>

            {/* QUANTITY */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Quantity"
                type="number"
                name="quantity"
                value={data.quantity}
                onChange={onchangeHandler}
                fullWidth
                onBlur={(e) => {
                  if (e.target.value < 0) {
                    setData((prev) => ({ ...prev, quantity: 0 }));
                  }
                }}
                inputProps={{
                  min: 0,
                  max: 30,
                  step: 1,
                }}
              />
            </Grid>

            {/* SUBMIT */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: wine,
                  px: 6,
                  py: 1.5,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: gold,
                    color: wine,
                  },
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Add Product"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Add;
