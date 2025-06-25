import { useEffect } from 'react';
import { /*useNavigate*/ useSearchParams } from 'react-router-dom';

function Redirect() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const insuranceId = searchParams.get('insurance_id');
    const ref = searchParams.get('ref');

    const logClickAndRedirect = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/logs/click', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            insurance_id: insuranceId,
            referrer: ref,
            clicked_at: new Date().toISOString(),
          }),
        });

        const data = await res.json();

        if (data.detail_url) {
          window.location.href = data.detail_url;
        } else {
          throw new Error("No detail_url returned");
        }
      } catch (error) {
        console.error("Redirect failed:", error);
        alert("ไม่สามารถเปลี่ยนหน้าได้");
      }
    };

    logClickAndRedirect();
  }, [searchParams]);

  return <p>⏳ กำลังโหลดข้อมูลและเปลี่ยนเส้นทาง...</p>;
}

export default Redirect;