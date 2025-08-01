const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMmJxMWExMjY0QHZ2aXQubmV0IiwiZXhwIjoxNzU0MDI5MjkxLCJpYXQiOjE3NTQwMjgzOTEsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJmYmQ5NDBhMy1iMjkyLTQzOGMtYWUzMS0zMjlmNGMzYTk4YzUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrYW1pc2V0dHkgcGF2YW5rYWx5YW4iLCJzdWIiOiIxNTE4YzUzNi02ZGY4LTQzYzYtYTdmMC05ZGE2YmFmYmMyOGQifSwiZW1haWwiOiIyMmJxMWExMjY0QHZ2aXQubmV0IiwibmFtZSI6ImthbWlzZXR0eSBwYXZhbmthbHlhbiIsInJvbGxObyI6IjIyYnExYTEyNjQiLCJhY2Nlc3NDb2RlIjoiUG5WQkZWIiwiY2xpZW50SUQiOiIxNTE4YzUzNi02ZGY4LTQzYzYtYTdmMC05ZGE2YmFmYmMyOGQiLCJjbGllbnRTZWNyZXQiOiJwSHBnQ05BcWVIdm55eHh5In0.zEax2QId4fC1sxfn1V8aOa5RiJHzw5exyduB2nSzZno';

const logApiUrl = 'http://20.244.56.144/evaluation-service/logs';

export const Log = async (stack, level, pkg, message) => {
  try {
    const response = await fetch(logApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: pkg,
        message: message
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to send log. Server responded with:', response.status, errorData);
    }

  } catch (error) {
    console.error('An error occurred while trying to send the log:', error);
  }
};