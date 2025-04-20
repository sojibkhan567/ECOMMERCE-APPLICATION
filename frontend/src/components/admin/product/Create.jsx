import React, { useEffect, useMemo, useRef, useState } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import JoditEditor from 'jodit-react'

const Create = ({ placeholder }) => {

  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: placeholder || 'Start typings...'
  }),
    [placeholder]
  );

  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // store product data method
  const saveProduct = async (data) => {

    const formData = { ...data, "content": content, 'gallery': gallery };
    //console.log(formData);

    setDisable(true)
    // fetch category data
    await fetch(`${apiUrl}/products`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
      body: JSON.stringify(formData)
    }).then(res => res.json())
      .then(result => {
        setDisable(false);
        if (result.status == 200) {
          toast.success(result.message);
          navigate('/admin/products');
        } else {
          //alert('Something went wrong.')
          const formErrors = result.errors;
          Object.keys(formErrors).forEach((field) => {
            setError(field, { message: formErrors[field][0] })
          })
        }
      });
  }

  // fetch category data for select tag
  const fetchCategories = async () => {
    await fetch(`${apiUrl}/categories`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    }).then(res => res.json())
      .then(result => {
        if (result.status == 200) {
          setCategories(result.data);
        } else {
          alert('Somthing went wrong.');
        }
      })
  }

  // fetch brands data for select tag
  const fetchBrnads = async () => {
    await fetch(`${apiUrl}/brands`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    }).then(res => res.json())
      .then(result => {
        if (result.status == 200) {
          setBrands(result.data);
        } else {
          alert('Somthing went wrong.');
        }
      })
  }

  // handle image upload file
  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('image', file);
    setDisable(true);

    await fetch(`${apiUrl}/temp-images`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
      body: formData
    }).then(res => res.json())
      .then(result => {
        //console.log(result)
        gallery.push(result.data.id); // add image id for product image
        setGallery(gallery);

        galleryImages.push(result.data.image_url); // for upload image preview
        setGalleryImages(galleryImages);

        setDisable(false);

        e.target.value = "";
      });
  }

  // handle delete preview image
  const handleDeleteImage = (image) => {
    const newGallery = galleryImages.filter((gallery) => gallery != image);
    setGalleryImages(newGallery);
  }

  useEffect(() => {
    fetchCategories();
    fetchBrnads();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Products / Create</h4>
            <Link to="/admin/products" className='btn btn-primary'>Back</Link>
          </div>
          {/** Sidebar */}
          <div className="col-md-3">
            <Sidebar />
          </div>
          {/** card */}
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">Product Title</label>
                    <input
                      {
                      ...register('title', {
                        required: "The title field is required."
                      })
                      }
                      type="text"
                      className={`form-control ${errors.title && 'is-invalid'}`}
                      placeholder='Title' />
                    {errors.title && <p className='invalid-feedback'>{errors.title?.message}</p>}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className='form-label' htmlFor="">Category</label>
                        <select
                          {
                          ...register('category_id', {
                            required: 'Please select a category.'
                          })
                          }
                          className={`form-control ${errors.status && 'is-invalid'}`}>
                          <option value="">Select a Category</option>
                          {categories && categories.map((category) => {
                            return (
                              <option key={category.id} value={category.id}>{category.name}</option>
                            )
                          })}
                        </select>
                        {errors.category_id && <p className='invalid-feedback'>{errors.category_id?.message}</p>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className='form-label' htmlFor="">Brand</label>
                        <select {...register('brand_id')} className='form-control'>
                          <option value="">Select a Brand</option>
                          {brands && brands.map((brand) => {
                            return (
                              <option key={`brand-${brand.id}`} value={brand.id}>{brand.name}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className='form-label' htmlFor="">Short Description</label>
                    <textarea {...register('short_description')} className='form-control' rows={5}></textarea>
                  </div>

                  <div className="mb-3">
                    <label className='form-label' htmlFor="">Description</label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    />
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Pricing</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className='form-label' htmlFor="">Price</label>
                        <input
                          {
                          ...register('price', {
                            required: "The price field is required."
                          })
                          }
                          className={`form-control ${errors.price && 'is-invalid'}`}
                          type="text"
                          placeholder='Price' />
                        {errors.price && <p className='invalid-feedback'>{errors.price?.message}</p>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className='form-label' htmlFor="">Discounted Price</label>
                        <input {...register('compare_price')} className='form-control' type="text" placeholder='Discounted price' />
                      </div>
                    </div>
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Inventory</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className='form-label' htmlFor="">SKU</label>
                        <input
                          {
                          ...register('sku', {
                            required: "The sku field is required."
                          })
                          }
                          className={`form-control ${errors.sku && 'is-invalid'}`} type="text" placeholder='SKU' />
                        {errors.sku && <p className='invalid-feedback'>{errors.sku?.message}</p>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className='form-label' htmlFor="">Barcode</label>
                        <input {...register('barcode')} className='form-control' type="text" placeholder='Barcode' />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className='form-label' htmlFor="">Qty</label>
                        <input {...register('qty')} className='form-control' type="text" placeholder='qty' />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className='form-label' htmlFor="">Status</label>
                        <select
                          {
                          ...register('status', {
                            required: 'Please select a status.'
                          })
                          }
                          className={`form-control ${errors.status && 'is-invalid'}`}>
                          <option value="">Select a Status</option>
                          <option value="1">Active</option>
                          <option value="0">Inactive</option>
                        </select>
                        {errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className='form-label' htmlFor="">Featured</label>
                    <select
                      {
                      ...register('is_featured', {
                        required: 'This field is required.'
                      })
                      }
                      className={`form-control ${errors.is_featured && 'is-invalid'}`}>
                      <option value="">Select a Status</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                    {errors.is_featured && <p className='invalid-feedback'>{errors.is_featured?.message}</p>}
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Gallery</h3>
                  <div className="mb-3">
                    <label className='form-label' htmlFor="">Image</label>
                    <input onChange={handleFile} className='form-control' type="file" placeholder='qty' />
                  </div>
                  {/** preview upload image */}
                  <div className="mb-3">
                    <div className="row">
                      {galleryImages && galleryImages.map((image) => {
                        return (
                          <div className="col-md-3">
                            <div className="card shadow">
                              <img src={image} alt="" className='w-100' />
                              <button onClick={() => { handleDeleteImage(image) }} className='btn btn-danger'>Delete</button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                </div>
              </div>
              <input disabled={disable} className='btn btn-primary mt-3 mb-5' type="submit" value='Create' />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Create

