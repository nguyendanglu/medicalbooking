const BACKEND_URL = 'http://127.0.0.1:3000';

async function verifyBackend() {
  console.log('Logging in as admin...');
  const loginRes = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@clinic.com',
      password: 'P@ssw0rd123'
    })
  });

  if (!loginRes.ok) {
    const err = await loginRes.text();
    console.error('Login failed:', err);
    return;
  }

  const { accessToken } = await loginRes.json();
  console.log('Token received. Testing fetch all appointments...');

  const apptRes = await fetch(`${BACKEND_URL}/appointments/admin`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });

  if (!apptRes.ok) {
    const err = await apptRes.text();
    console.error('Fetch appointments failed:', err);
    return;
  }

  const appointments = await apptRes.json();
  console.log(`Success! Fetched ${appointments.length} appointments.`);
  if (appointments.length > 0) {
    console.log('Sample appointment:', JSON.stringify(appointments[0], null, 2));
    
    console.log('\nTesting status update...');
    const targetId = appointments[0].id;
    const updateRes = await fetch(`${BACKEND_URL}/appointments/${targetId}/status`, {
      method: 'PATCH',
      headers: { 
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'CONFIRMED' })
    });

    if (updateRes.ok) {
      console.log('Status update successful!');
    } else {
      console.error('Status update failed');
    }
  }
}

verifyBackend();
