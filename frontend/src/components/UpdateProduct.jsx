import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const [image, setImage] = useState();
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    desc: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    available: false,
    quantity: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/${id}`
        );

        const responseImage = await axios.get(
          `http://localhost:8080/api/product/${id}/image`,
          { responseType: "blob" }
        );
        const imageFile = await convertUrlToFile(responseImage.data, response.data.imageName);
        setImage(imageFile);

        const data = response.data;
        if (data.releaseDate) {
          data.releaseDate = data.releaseDate.split("-").reverse().join("-");
        }
        setUpdateProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const convertUrlToFile = async (blobData, fileName) => {
    return new File([blobData], fileName, { type: blobData.type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedProduct = {
      ...updateProduct,
      price: parseFloat(updateProduct.price),
      quantity: parseInt(updateProduct.quantity),
      releaseDate: updateProduct.releaseDate
        ? updateProduct.releaseDate.split("-").reverse().join("-")
        : "",
    };

    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(formattedProduct)], { type: "application/json" })
    );

    axios
      .put(`http://localhost:8080/api/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Product updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Failed to update product. Please try again.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({ ...updateProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="update-product-container">
      <div className="center-container">
        <h1>Update Product</h1>
        <form className="row g-3 pt-5" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label"><h6>Name</h6></label>
            <input
              type="text"
              className="form-control"
              value={updateProduct.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label"><h6>Brand</h6></label>
            <input
              type="text"
              name="brand"
              className="form-control"
              value={updateProduct.brand}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label className="form-label"><h6>Description</h6></label>
            <input
              type="text"
              className="form-control"
              name="desc"
              onChange={handleChange}
              value={updateProduct.desc}
            />
          </div>
          <div className="col-5">
            <label className="form-label"><h6>Price</h6></label>
            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              value={updateProduct.price}
              name="price"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label"><h6>Category</h6></label>
            <select
              className="form-select"
              value={updateProduct.category}
              onChange={handleChange}
              name="category"
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label"><h6>Stock Quantity</h6></label>
            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              value={updateProduct.quantity}
              name="quantity"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label"><h6>Release Date</h6></label>
            <input
              type="date"
              className="form-control"
              value={updateProduct.releaseDate}
              name="releaseDate"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-8">
            <label className="form-label"><h6>Image</h6></label>
            <img
              src={image ? URL.createObjectURL(image) : ""}
              alt="product"
              style={{ width: "100%", height: "180px", objectFit: "cover", padding: "5px" }}
            />
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="available"
                checked={updateProduct.available}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, available: e.target.checked })
                }
              />
              <label className="form-check-label">Product Available</label>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;