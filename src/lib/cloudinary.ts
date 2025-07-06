import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function uploadImage(file: File) {
  try {
    // Convert file to base64
    const base64data = await fileToBase64(file)
    
    // Upload to Cloudinary
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: base64data,
        fileName: file.name,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = await response.json()
    return data.url
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export async function uploadMultipleImages(files: File[]) {
  try {
    const uploadPromises = files.map(file => uploadImage(file))
    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error('Error uploading multiple images:', error)
    throw error
  }
}

// Helper function to convert File to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

// Server-side only function for direct Cloudinary upload
export async function serverUploadImage(base64Image: string, folder = 'luxestore') {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder,
      resource_type: 'image',
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
    })

    return {
      url: result.secure_url,
      publicId: result.public_id,
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw error
  }
}

// Generate Cloudinary URL with transformations
export function getImageUrl(publicId: string, options: {
  width?: number
  height?: number
  crop?: string
  quality?: string
  format?: string
} = {}) {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto:good',
    format = 'auto',
  } = options

  const transformations = []

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (crop) transformations.push(`c_${crop}`)
  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)

  const transformationString = transformations.join(',');
  
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${publicId}`
}