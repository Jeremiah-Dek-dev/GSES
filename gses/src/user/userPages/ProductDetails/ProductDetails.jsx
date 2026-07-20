import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
} from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import { assets } from "../../assets/assets";
import api from "../../../API/api";

const wine = "#4B0F1C";
const gold = "#D4AF37";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/design/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Could not load this product. It may no longer be available.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress sx={{ color: wine }} />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography color="error" sx={{ mb: 2 }}>
          {error || "Product not found."}
        </Typography>
        <Button onClick={() => navigate(-1)} sx={{ color: wine }}>
          Go Back
        </Button>
      </Box>
    );
  }

  const { name, price, description, image, quantity, category, sku } = product;
  const imageUrl = image
    ? `${api.defaults.baseURL}/images/${image}`
    : assets.default_image;

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", px: { xs: 2, md: 4 }, py: 6 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        <FaArrowLeft color={wine} size={18} />
      </IconButton>

      <Grid container spacing={5}>
        {/* Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={imageUrl}
            alt={name}
            onError={(e) => (e.target.src = assets.default_image)}
            sx={{
              width: "100%",
              height: 420,
              objectFit: "cover",
              borderRadius: 3,
              boxShadow: `0 8px 24px rgba(0,0,0,0.15)`,
            }}
          />
        </Grid>

        {/* Details */}
        <Grid item xs={12} md={6}>
          {category && (
            <Chip
              label={category}
              size="small"
              sx={{
                mb: 2,
                bgcolor: `${gold}22`,
                color: wine,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            />
          )}

          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {name || "Unnamed Item"}
          </Typography>

          {sku && (
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              SKU: {sku}
            </Typography>
          )}

          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: wine, my: 3 }}
          >
            ${price?.toFixed(2) || "0.00"}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="body1" sx={{ color: "text.secondary", mb: 3, lineHeight: 1.7 }}>
            {description || "No description available."}
          </Typography>

          <Box
            sx={{
              display: "inline-block",
              px: 2,
              py: 0.5,
              borderRadius: "50px",
              backgroundColor: quantity < 5 ? wine : gold,
              color: "#fff",
              fontWeight: "bold",
              fontSize: 14,
              mb: 4,
            }}
          >
            {quantity < 5 ? `Only ${quantity} left` : "In Stock"}
          </Box>

          <Button
            fullWidth
            size="large"
            sx={{
              background: wine,
              color: "#fff",
              fontWeight: "bold",
              py: 1.5,
              "&:hover": { background: gold, color: wine },
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;