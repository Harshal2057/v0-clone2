"use server"

import {db} from "../../../lib/db.js"
import { currentUser } from "@clerk/nextjs/server"


export const onboardUser = async() => {
    try {
        const user = await currentUser()

        if (!user) {
            return {
                success:false,
                message:"Unauthorized"
            }
        }

        const { id, firstName, lastName, emailAddresses, imageUrl } = user;

        const newUser = await db.user.upsert({
            where:{
                clerkId:id
            },
            update:{
                name: firstName && lastName 
                ? `${firstName} ${lastName}`
                : firstName || lastName || null,
                email: emailAddresses[0]?.emailAddress || "",
                image: imageUrl || null
            },
            create:{
                clerkId:id,
                name: firstName && lastName 
                ? `${firstName} ${lastName}`
                : firstName || lastName || null,
                email: emailAddresses[0]?.emailAddress || "",
                image: imageUrl || null
            }
        })

        return {
           success: true,
            user:newUser,
            message:"User onboarded successfully"
        }

    } catch (error) {
        console.log("Error occured while onboarding the user" , error);
        return {
            success:false,
            message:"Failed to onboard user"
        }
        
    }
}

export const getCurrentUser = async() => {
    try {
        const user = await currentUser();

        if(!user){
            return null;
        }

        const dbUser = await db.user.findUnique({
            where:{
                clerkId:user.id
            },
            select:{
                id:true,
                clerkId:true,
                name:true,
                email:true,
                image:true
            }
        })

        return dbUser
    } catch (error) {
        console.log("❌ error occured in getCurrentUser" , error);
        return null
        
    }
}