import bcryptHashGeneratorVersion from "@/app/layanan/(publish)/(developer)/bcrypt-hash-generator/version";
import chmodCalculatorVersion from "@/app/layanan/(publish)/(developer)/chmod-calculator/version";
import cssMinifyVersion from "@/app/layanan/(publish)/(developer)/css-minify/version";
import cssUnminifyVersion from "@/app/layanan/(publish)/(developer)/css-unminify/version";
import displayVersion from "@/app/layanan/(publish)/(developer)/display/version";
import dummyFileVersion from "@/app/layanan/(publish)/(developer)/dummy-file/version";
import easyCdnVersion from "@/app/layanan/(publish)/(developer)/easy-cdn/version";
import flexPlaygroundVersion from "@/app/layanan/(publish)/(developer)/flex-playground/version";
import gerbangLogikaVersion from "@/app/layanan/(publish)/(developer)/gerbang-logika/version";
import gridPlaygroundVersion from "@/app/layanan/(publish)/(developer)/grid-playground/version";
import imageCompressorVersion from "@/app/layanan/(publish)/(developer)/image-compressor/version";
import jsonFormatterVersion from "@/app/layanan/(publish)/(developer)/json-formatter/version";
import markdownConverterVersion from "@/app/layanan/(publish)/(developer)/markdown-converter/version";
import pageSizeCheckerVersion from "@/app/layanan/(publish)/(developer)/page-size-checker/version";
import qrGeneratorVersion from "@/app/layanan/(publish)/(developer)/qr-generator/version";
import regexTesterVersion from "@/app/layanan/(publish)/(developer)/regex-tester/version";
import responsiveCssGeneratorVersion from "@/app/layanan/(publish)/(developer)/responsive-css-generator/version";
import shaHashGeneratorVersion from "@/app/layanan/(publish)/(developer)/sha-hash-generator/version";
import slugGeneratorVersion from "@/app/layanan/(publish)/(developer)/slug-generator/version";
import tintShadeGeneratorVersion from "@/app/layanan/(publish)/(developer)/tint-shade-generator/version";
import uuidGeneratorVersion from "@/app/layanan/(publish)/(developer)/uuid-generator/version";
import youtubeEmbedGeneratorVersion from "@/app/layanan/(publish)/(developer)/youtube-embed-generator/version";
import campaignUrlBuilderVersion from "@/app/layanan/(publish)/(seo)/campaign-url-builder/version";
import convertcaseVersion from "@/app/layanan/(publish)/(seo)/convertcase/version";
import crawlerSimulatorVersion from "@/app/layanan/(publish)/(seo)/crawler-simulator/version";
import faviconCheckerVersion from "@/app/layanan/(publish)/(seo)/favicon-checker/version";
import findReplaceVersion from "@/app/layanan/(publish)/(seo)/find-replace/version";
import imageExtractorVersion from "@/app/layanan/(publish)/(seo)/image-extractor/version";
import imageToTextVersion from "@/app/layanan/(publish)/(seo)/image-to-text/version";
import jsonldGeneratorVersion from "@/app/layanan/(publish)/(seo)/jsonld-generator/version";
import keywordDensityCheckerVersion from "@/app/layanan/(publish)/(seo)/keyword-density-checker/version";
import keywordPermutationVersion from "@/app/layanan/(publish)/(seo)/keyword-permutation/version";
import loremGeneratorVersion from "@/app/layanan/(publish)/(seo)/lorem-generator/version";
import metaGeneratorVersion from "@/app/layanan/(publish)/(seo)/meta-generator/version";
import removeWhitespaceVersion from "@/app/layanan/(publish)/(seo)/remove-whitespace/version";
import responsiveTesterVersion from "@/app/layanan/(publish)/(seo)/responsive-tester/version";
import robotsGeneratorVersion from "@/app/layanan/(publish)/(seo)/robots-generator/version";
import textCompareVersion from "@/app/layanan/(publish)/(seo)/text-compare/version";
import titleMetaCheckerVersion from "@/app/layanan/(publish)/(seo)/title-meta-checker/version";
import wordCounterVersion from "@/app/layanan/(publish)/(seo)/word-counter/version";

const DEFAULT_SERVICE_VERSION = {
  current: "v1.0.0",
  history: [
    {
      version: "v1.0.0",
      releasedAt: "2026-06-17",
      changes: ["Rilis awal layanan publish"],
    },
  ],
};

// Add per-service overrides here when a feature gets its own release history.
export const serviceVersionRegistry = {
  "bcrypt-hash-generator": bcryptHashGeneratorVersion,
  "chmod-calculator": chmodCalculatorVersion,
  "css-minify": cssMinifyVersion,
  "css-unminify": cssUnminifyVersion,
  display: displayVersion,
  "dummy-file": dummyFileVersion,
  "easy-cdn": easyCdnVersion,
  "flex-playground": flexPlaygroundVersion,
  "gerbang-logika": gerbangLogikaVersion,
  "grid-playground": gridPlaygroundVersion,
  "image-compressor": imageCompressorVersion,
  "json-formatter": jsonFormatterVersion,
  "markdown-converter": markdownConverterVersion,
  "page-size-checker": pageSizeCheckerVersion,
  "qr-generator": qrGeneratorVersion,
  "regex-tester": regexTesterVersion,
  "responsive-css-generator": responsiveCssGeneratorVersion,
  "sha-hash-generator": shaHashGeneratorVersion,
  "slug-generator": slugGeneratorVersion,
  "tint-shade-generator": tintShadeGeneratorVersion,
  "uuid-generator": uuidGeneratorVersion,
  "youtube-embed-generator": youtubeEmbedGeneratorVersion,
  "campaign-url-builder": campaignUrlBuilderVersion,
  convertcase: convertcaseVersion,
  "crawler-simulator": crawlerSimulatorVersion,
  "favicon-checker": faviconCheckerVersion,
  "find-replace": findReplaceVersion,
  "image-extractor": imageExtractorVersion,
  "image-to-text": imageToTextVersion,
  "jsonld-generator": jsonldGeneratorVersion,
  "keyword-density-checker": keywordDensityCheckerVersion,
  "keyword-permutation": keywordPermutationVersion,
  "lorem-generator": loremGeneratorVersion,
  "meta-generator": metaGeneratorVersion,
  "remove-whitespace": removeWhitespaceVersion,
  "responsive-tester": responsiveTesterVersion,
  "robots-generator": robotsGeneratorVersion,
  "text-compare": textCompareVersion,
  "title-meta-checker": titleMetaCheckerVersion,
  "word-counter": wordCounterVersion,
  default: DEFAULT_SERVICE_VERSION,
};

export function getServiceSlugFromPath(pathname = "") {
  if (!pathname) return "";

  const normalized = pathname.split("?")[0].split("#")[0];
  const parts = normalized.split("/").filter(Boolean);

  if (parts[0] !== "layanan" || parts.length < 2) return "";

  return parts[1];
}

export function getServiceSlugFromHref(href = "") {
  if (!href) return "";

  const normalized = href.split("?")[0].split("#")[0];
  const parts = normalized.split("/").filter(Boolean);

  if (parts[0] !== "layanan" || parts.length < 2) return "";

  return parts[1];
}

export function getServiceVersionRecord(slug) {
  if (!slug) return serviceVersionRegistry.default;

  return serviceVersionRegistry[slug] || serviceVersionRegistry.default;
}

export function getServiceVersionFromHref(href) {
  return getServiceVersionRecord(getServiceSlugFromHref(href));
}
