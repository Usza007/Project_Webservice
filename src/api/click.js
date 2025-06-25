export const logInsuranceClick = async (insuranceId, detailUrl, token) => {
    try {
      await fetch('http://localhost:8080/api/logs/click', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          insurance_id: insuranceId,
          referrer: window.location.hostname,
          clicked_at: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error("Error logging click:", error);
    } finally {
      window.location.href = detailUrl;
    }
  };
  