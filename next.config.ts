import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental :{
    serverActions : {
      bodySizeLimit : '5mb'
    }
  },
  reactStrictMode : false,
  images : {
      remotePatterns :[
        {
          protocol : 'https',
          hostname : 'vuwmdwxqrdrovgulngwy.supabase.co'
        }
      ],
      domains: ["vuwmdwxqrdrovgulngwy.supabase.co"],
  }
};

export default nextConfig;
