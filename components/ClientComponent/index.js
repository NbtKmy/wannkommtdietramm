"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/router'

export default function ClientCompoent() {
  
    useEffect(() => {
        const id = setInterval(() => {
            const router = useRouter()
            router.reload()
        }, 30000);
        return () => clearInterval(id);
    }, [])
  
    return (
        <h1>Haltestelle: Zürich, Kantonsschule</h1>
    );
  }


