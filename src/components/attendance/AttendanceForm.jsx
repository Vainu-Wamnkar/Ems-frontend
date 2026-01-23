      import React, { useState, useRef, useEffect } from "react";
      import { Camera } from "lucide-react";
      import axios from "axios";
      import toast from "react-hot-toast";

      const MarkAttendance = ({ selectedDate, onClose }) => {
        const [photo, setPhoto] = useState(null);
        const [location, setLocation] = useState(null);
        const [loading, setLoading] = useState(false);

        const videoRef = useRef(null);
        const canvasRef = useRef(null);

        // ================= TODAY DATE =================
        const today = new Date().toISOString().split("T")[0];

        // ❌ Previous / Future date → UI hi mat dikhao
        if (selectedDate !== today) {
          onClose();          
          return null;
        }


        // ================= CAMERA AUTO START (ONLY TODAY) =================
        useEffect(() => {
          if (selectedDate === today) {
            startCamera();
          }

          return () => stopCamera();
        }, [selectedDate]);

        const startCamera = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            alert("❌ Camera access denied");
          }
        };

        const stopCamera = () => {
          if (videoRef.current?.srcObject) {
            videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
          }
        };

        // ================= CAPTURE PHOTO =================
        const capturePhoto = () => {
          const video = videoRef.current;
          const canvas = canvasRef.current;

          if (!video) return;

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0);

          const imageData = canvas.toDataURL("image/jpeg");
          setPhoto(imageData);

          stopCamera();
          getLocation();
        };

        // ================= GET LOCATION =================
        const getLocation = () => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setLocation({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
              });
            },
            () => {
              alert("❌ Location access denied");
            }
          );
        };

        // ================= SUBMIT ATTENDANCE =================
        const submitAttendance = async () => {
          if (!photo || !location) {
            alert("⚠️ Please capture photo and allow location");
            return;
          }

          try {
            setLoading(true);

            await axios.post(
              "https://ems-backend-ofjk.onrender.com/api/attendance/mark",
              {
                date: selectedDate,
                image: photo,
                location,
                time: new Date().toLocaleTimeString(),
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            toast.success("✅ Attendance marked successfully");
            onClose();
          } catch (error) {
            if (error.response?.status === 409) {
              toast.error("⚠️ Attendance already marked");
            } else if (error.response?.data?.message) {
              toast.error(error.response.data.message);
            } else {
              toast.error("❌ Server error. Please try again");
            }
          } finally {
            setLoading(false);
          }
        };

        // ================= BLOCK PREVIOUS / FUTURE DATE =================
        if (selectedDate !== today) {
          return (
            <div className="p-6 text-center">
              <p className="text-red-600 font-semibold text-lg">
                ⚠️ Attendance can only be marked for today
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          );
        }

        // ================= UI =================
        return (
          <div className="flex flex-col items-center space-y-4 p-4">
            {!photo ? (
              <>
                {/* CAMERA */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-64 h-48 rounded-xl border shadow"
                />
                <canvas ref={canvasRef} hidden />

                {/* CAPTURE BUTTON */}
                <button
                  onClick={capturePhoto}
                  className="
                    w-64
                    flex items-center justify-center gap-2
                    py-3
                    border-2 border-green-600
                    text-green-700 font-semibold
                    rounded-xl
                    hover:bg-green-50
                    active:scale-95
                    transition-all
                  "
                >
                  <Camera size={20} />
                  Capture Photo
                </button>
              </>
            ) : (
              <>
                {/* PHOTO PREVIEW */}
                <img
                  src={photo}
                  alt="Captured"
                  className="w-40 h-40 rounded-full border shadow"
                />

                {/* LOCATION */}
                <p className="text-sm text-gray-600">
                  📍 {location?.lat.toFixed(4)}, {location?.lon.toFixed(4)}
                </p>

                {/* SUBMIT BUTTON */}
                <button
                  onClick={submitAttendance}
                  disabled={loading}
                  className={`
                    w-64
                    py-3
                    rounded-xl
                    font-semibold
                    text-white
                    transition
                    ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }
                  `}
                >
                  {loading ? "Submitting..." : "Submit Attendance"}
                </button>
              </>
            )}
          </div>
        );
      };

      export default MarkAttendance;
