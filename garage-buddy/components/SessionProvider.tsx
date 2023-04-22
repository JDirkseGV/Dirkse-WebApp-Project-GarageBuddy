'use client'

import {Session} from "next-auth"
import {SessionProvider as Provider} from "next-auth/react"
import React from "react"

type Properties = {
    children: React.ReactNode;
    session: Session | null;
}

export function SessionProvider({children, session}: Properties){
    return (
        <Provider>
            {children}
        </Provider>
    );
}