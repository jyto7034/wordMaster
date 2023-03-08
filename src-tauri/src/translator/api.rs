use serde::{Deserialize, Serialize};
use whatlang::{detect, Lang};
use std::io::{self};
use reqwest;

#[derive(Debug, Serialize, Deserialize)]
struct TranslationResult {
  message: TranslationMessage,
}

#[derive(Debug, Serialize, Deserialize)]
struct TranslationMessage {
  result: TranslationData,
}

#[derive(Debug, Serialize, Deserialize)]
#[allow(non_snake_case)]
struct TranslationData {
  translatedText: String,
}

fn check_lang(text: &str) -> Lang {
    detect(text).unwrap().lang()
}

pub fn translate(word: &str) -> io::Result<String> {
  let client = reqwest::blocking::Client::new();
  let client_id = "z_fesul_NKp4IulPw30J";
  let client_secret = "rRJ9mj3JxN";

  let (src, dst) = match check_lang(word){
    Lang::Kor => ("ko", "en"),
    _ => ("en", "ko"),
  };

  let res = client
    .post("https://openapi.naver.com/v1/papago/n2mt")
    .header("X-Naver-Client-Id", client_id)
    .header("X-Naver-Client-Secret", client_secret)
    .form(&[("source", src), ("target", dst), ("text", word)])
    .send()
    .unwrap();

  let result: TranslationResult = res.json().unwrap();

  Ok(result.message.result.translatedText)
}
