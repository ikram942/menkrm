import { useTranslations } from "next-intl";

export default function Product() {
    const t = useTranslations("product");
    return (
        <div className="product-page">
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
        </div>
    )
}
