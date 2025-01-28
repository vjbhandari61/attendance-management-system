import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface AttendanceModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { image: string; location: { lat: number; lng: number } }) => void
}

export function AttendanceModal({ isOpen, onClose, onSubmit }: AttendanceModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [isCaptured, setIsCaptured] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [cameraError, setCameraError] = useState<string>('')

  // Initialize camera when modal opens
  useEffect(() => {
    let mounted = true;

    async function initializeCamera() {
      try {
        if (isOpen) {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' }
          });

          if (mounted) {
            setStream(mediaStream);
            if (videoRef.current) {
              videoRef.current.srcObject = mediaStream;
              // Ensure video plays after setting srcObject
              await videoRef.current.play();
            }
          }
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setCameraError('Could not access camera. Please ensure camera permissions are granted.');
      }
    }

    // Get location
    if (isOpen) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (mounted) {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          }
        },
        (err) => {
          console.error('Error getting location:', err);
          setCameraError('Could not access location. Please enable location services.');
        }
      );

      initializeCamera();
    }

    // Cleanup function
    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
      setCameraError('');
      setIsCaptured(false);
      setIsVerifying(false);
    };
  }, [isOpen]);

  const handleClose = () => {
    // Stop all tracks before closing
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStream(null);
    setCameraError('');
    setIsCaptured(false);
    setIsVerifying(false);
    onClose();
  };

  const captureImage = () => {
    if (!videoRef.current || !location) return;

    setIsCapturing(true);
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx && videoRef.current) {
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      setIsCapturing(false);
      setIsCaptured(true);
      setIsVerifying(true);

      // Simulate face verification
      setTimeout(() => {
        setIsVerifying(false);
        onSubmit({ image: imageData, location });
        handleClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">
          <div className="space-y-6">
            {cameraError ? (
              <div className="text-center text-red-600 py-8">
                <p>{cameraError}</p>
              </div>
            ) : !isCaptured ? (
              <>
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Position your face within the frame and ensure good lighting
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                {isVerifying ? (
                  <div className="space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
                    <p>Verifying your face...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">Face Verified!</p>
                    <p className="text-sm text-gray-500">
                      Your attendance has been marked successfully
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              {!isCaptured && !cameraError && (
                <Button
                  onClick={captureImage}
                  disabled={isCapturing || !location || !stream}
                >
                  {isCapturing ? 'Capturing...' : 'Capture Photo'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 