import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function POST(request: NextRequest) {
  try {
    const { data, fileName } = await request.json()

    if (!data) {
      return NextResponse.json(
        { success: false, message: 'No image data provided' },
        { status: 400 }
      )
    }

    // Validate Cloudinary configuration
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { success: false, message: 'Cloudinary is not properly configured' },
        { status: 500 }
      )
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(data, {
      folder: 'luxestore',
      public_id: fileName ? fileName.replace(/\.[^/.]+$/, '') : undefined, // Remove file extension
      resource_type: 'image',
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
    })

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    })
  } catch (error) {
    console.error('Error in Cloudinary upload route:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to upload image' },
      { status: 500 }
    )
  }
}