/**
 * Utility functions for uploading images to ImgBB
 */

// Convert file to base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64String = reader.result as string
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1]
      resolve(base64Data)
    }
    reader.onerror = error => reject(error)
  })
}

// Upload a single image to ImgBB
export async function uploadToImgBB(file: File) {
  try {
    const base64Data = await fileToBase64(file)
    
    // Use the API route to handle the upload
    const response = await fetch('/api/upload-imgbb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Data,
        name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to upload image')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error uploading to ImgBB:', error)
    throw error
  }
}

// Upload multiple images to ImgBB
export async function uploadMultipleToImgBB(files: File[]) {
  try {
    const uploadPromises = files.map(file => uploadToImgBB(file))
    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error('Error uploading multiple images to ImgBB:', error)
    throw error
  }
}

// Server-side function to upload to ImgBB
export async function serverUploadToImgBB(base64Image: string, name: string) {
  try {
    if (!process.env.IMGBB_API_KEY) {
      throw new Error('ImgBB API key is not defined')
    }

    const formData = new FormData()
    formData.append('key', process.env.IMGBB_API_KEY)
    formData.append('image', base64Image)
    formData.append('name', name)

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`ImgBB upload failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Server error uploading to ImgBB:', error)
    throw error
  }
}