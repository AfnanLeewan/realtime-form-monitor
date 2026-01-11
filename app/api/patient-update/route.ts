import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientData, status } = body;
    await pusher.trigger(
      'hospital-system',
      'patient-input',
      {
        patientData,
        status,
        timestamp: new Date().toISOString(),
      }
    );
    return NextResponse.json({ 
      success: true, 
      message: 'Patient data sent successfully' 
    });
  } catch (error) {
    console.error('Pusher error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send data' },
      { status: 500 }
    );
  }
}
