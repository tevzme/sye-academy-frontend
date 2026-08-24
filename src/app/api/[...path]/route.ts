import { NextRequest, NextResponse } from 'next/server';

function getBackendBaseUrl(req: NextRequest): string {
  // 1. If explicitly set via environment variable
  if (process.env.BACKEND_URL) {
    return process.env.BACKEND_URL.replace(/\/+$/, '');
  }

  // 2. Derive dynamically from incoming Host header
  const host = (req.headers.get('x-forwarded-host') || req.headers.get('host') || '').toLowerCase();
  
  if (host.includes('tkgsit')) {
    return 'https://syeacademybackend-tkgsit.aeonth.com';
  }
  if (host.includes('tkguat')) {
    return 'https://syeacademybackend-tkguat.aeonth.com';
  }
  if (host.includes('tkg.aeonth.com') || host.includes('syeacademy') || host.includes('sye-academy')) {
    return 'https://syeacademybackend-tkg.aeonth.com';
  }

  // 3. Fallback for Local Development
  return 'http://127.0.0.1:8080';
}

async function handleProxy(req: NextRequest, { params }: { params: { path: string[] } }) {
  const backendBase = getBackendBaseUrl(req);
  const path = params.path ? params.path.join('/') : '';
  const search = req.nextUrl.search || '';
  const targetUrl = `${backendBase}/api/${path}${search}`;

  const headers = new Headers(req.headers);
  headers.delete('host');

  let body: any = undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    try {
      body = await req.blob();
    } catch {
      // no body
    }
  }

  try {
    const res = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: body,
      cache: 'no-store'
    });

    const resHeaders = new Headers(res.headers);
    return new NextResponse(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: resHeaders
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: 'Failed to proxy request to backend',
        details: err.message,
        targetUrl
      },
      { status: 502 }
    );
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
