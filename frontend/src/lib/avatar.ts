/**
 * 리더보드 아바타 이모지.
 * users 테이블에 emoji 컬럼이 없으므로(11번 문서: "닉네임 해시로 프론트에서 붙여도 됨),
 * 닉네임을 해싱해 고정 배정한다 — 같은 사람은 항상 같은 이모지가 나온다.
 */
const AVATARS = [
  "🦊", "🐧", "🐼", "🦉", "🐻", "🐰", "🦖", "🐱",
  "🐨", "🦁", "🐯", "🐸", "🦄", "🐢", "🦜", "🐙",
];

export const avatarFor = (nickname: string): string => {
  let hash = 0;
  for (let i = 0; i < nickname.length; i++) {
    hash = (hash * 31 + nickname.charCodeAt(i)) >>> 0;
  }
  return AVATARS[hash % AVATARS.length];
};
