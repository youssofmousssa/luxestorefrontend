import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { image, name } = await request.json()

    if (!image) {
      return NextResponse.json(
        { success: false, message: 'No image data provided' },
        { status: 400 }
      )
    }

    if (!process.env.IMGBB_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'ImgBB API key is not configured' },
        { status: 500 }
      )
    }

    const formData = new FormData()
    formData.append('key', process.env.IMGBB_API_KEY)
    formData.append('image', image)
    
    if (name) {
      formData.append('name', name)
    }

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ImgBB API error:', errorText)
      return NextResponse.json(
        { success: false, message: 'Failed to upload to ImgBB' },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    return NextResponse.json({
      success: true,
      data: {
        url: data.data.url,
        display_url: data.data.display_url,
        delete_url: data.data.delete_url,
        medium: data.data.medium?.url,
        thumb: data.data.thumb?.url,
      },
    })
  } catch (error) {
    console.error('Error in ImgBB upload route:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}