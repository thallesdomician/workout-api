import { I18nService } from 'nestjs-i18n';

export async function translateType(
  i18n: I18nService,
  type: string,
): Promise<string> {
  return await i18n.t(`common.labels.${type}`, {
    defaultValue: type,
  });
}
