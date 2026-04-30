import { getTranslations } from "next-intl/server";

export async function GET() {
    const t = await getTranslations("product");
    const currency = "MAD"

    const products = [
        {
            id: 1,
            title: t('product1Title'),
            price: t(`product1Price_${currency}`),
            description: t('product1Desc'),
            image: "/creme.webp"
        },
        {
            id: 2,
            title: t('product2Title'),
            price: t(`product2Price_${currency}`),
            description: t('product2Desc'),
            image: "/champo.webp"
        },
        {
            id: 3,
            title: t('product3Title'),
            price: t(`product3Price_${currency}`),
            description: t('product3Desc'),
            image: "/gel.webp"
        },
        {
            id: 4,
            title: t('product4Title'),
            price: t(`product4Price_${currency}`),
            description: t('product4Desc'),
            image: "/spryt.webp"
        },
        {
            id: 5,
            title: t('product5Title'),
            price: t(`product5Price_${currency}`),
            description: t('product5Desc'),
            image: "/apres-champo.webp"
        },
        {
            id: 6,
            title: t('product6Title'),
            price: t(`product6Price_${currency}`),
            description: t('product6Desc'),
            image: "/huile.webp"
        }
    ];

    return Response.json(products);
}