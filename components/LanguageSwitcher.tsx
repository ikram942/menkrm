'use client';

import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MdLanguage } from 'react-icons/md';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (newLocale: string | null) => {
    if (!newLocale) return;
    router.push(pathname, { locale: newLocale as any });
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const current = languages.find((l) => l.code === locale);

  return (
    <Select value={locale} onValueChange={switchLanguage}>
      <SelectTrigger className="p-0 border-none bg-transparent shadow-none hover:opacity-70 transition-opacity cursor-pointer w-auto h-auto [&>svg:last-child]:hidden">
        <MdLanguage className="size-6 text-current shrink-0" />
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            className={`flex items-center gap-2 cursor-pointer ${locale === lang.code ? 'font-semibold' : ''}`}
          >
            <span className="text-base">{lang.flag}</span>
            <span>{lang.name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
