import type { Challenge, Course, Language } from "./types";

/**
 * 코딩고링 학습 콘텐츠 (초안).
 * - Python 트랙: WRITE/BUGFIX는 Pyodide로 "실제 실행" 채점.
 * - C 트랙: 초안에서는 출력 예측/빈칸/재배열 위주. 실제 C 실행은
 *   계획서의 Docker 샌드박스 백엔드 연동 예정.
 * 계획서대로 콘텐츠는 코드에서 분리해 두어 JSON/YAML로 옮기기 쉽게 했다.
 */

export const python: Course = {
  id: "python",
  title: "파이썬 입문",
  emoji: "🐍",
  description: "실행하며 배우는 파이썬 기초",
  units: [
    {
      id: "py-u1",
      order: 1,
      title: "유닛 1 · 파이썬 첫 걸음",
      description: "출력과 변수, 그리고 첫 실행 채점",
      lessons: [
        {
          id: "py-u1-l1",
          title: "출력하기",
          challenges: [
            {
              id: "py-u1-l1-c1",
              conceptTags: ["output"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 실행 결과는?",
              codeSnippet: 'print("코딩고링")',
              explanation:
                "print() 는 괄호 안의 값을 화면에 출력합니다. 문자열의 따옴표는 출력되지 않습니다.",
              options: [
                { id: "a", text: "코딩고링", correct: true },
                { id: "b", text: '"코딩고링"', correct: false },
                { id: "c", text: "print(코딩고링)", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u1-l1-c2",
              conceptTags: ["output"],
              type: "FILL",
              language: "python",
              question: "화면에 Hello 를 출력하도록 빈칸을 채우세요.",
              explanation: "파이썬에서 출력에 쓰는 함수 이름을 떠올려 보세요.",
              fillCode: '{{0}}("Hello")',
              fillAnswers: [["print"]],
            },
            {
              id: "py-u1-l1-c3",
              conceptTags: ["output"],
              type: "WRITE",
              language: "python",
              question: "정확히 다음 한 줄을 출력하는 프로그램을 작성하세요:  안녕, 코딩고링!",
              explanation:
                'print("안녕, 코딩고링!") 처럼 문자열을 그대로 출력하면 됩니다.',
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [{ expected: "안녕, 코딩고링!" }],
            },
            {
              id: "py-u1-l1-c4",
              conceptTags: ["output"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 실행 결과는?",
              codeSnippet: "print(1, 2, 3)",
              explanation:
                "print() 에 값을 콤마로 여러 개 넣으면 공백으로 구분되어 한 줄에 출력됩니다.",
              options: [
                { id: "a", text: "1 2 3", correct: true },
                { id: "b", text: "1,2,3", correct: false },
                { id: "c", text: "123", correct: false },
                { id: "d", text: "(1, 2, 3)", correct: false },
              ],
            },
            {
              id: "py-u1-l1-c5",
              conceptTags: ["output", "string"],
              type: "FILL",
              language: "python",
              question: "두 문자열을 이어 붙여 '코딩고링' 이 출력되도록 빈칸을 채우세요.",
              explanation: "문자열은 + 연산자로 이어 붙일 수 있습니다.",
              fillCode: 'print("코딩" {{0}} "고링")',
              fillAnswers: [["+"]],
            },
            {
              id: "py-u1-l1-c6",
              conceptTags: ["output", "variable"],
              type: "PARSONS",
              language: "python",
              question: "이름과 나이를 각각 한 줄씩 출력하도록 줄 순서를 맞추세요.",
              explanation: "변수를 정의한 뒤 각각 출력하면 됩니다.",
              parsonsLines: [
                'name = "코딩고링"',
                "age = 3",
                "print(name)",
                "print(age)",
              ],
            },
            {
              id: "py-u1-l1-c7",
              conceptTags: ["output", "debug"],
              type: "BUGFIX",
              language: "python",
              question: "다음 코드는 오류가 납니다. 버그를 고치세요.",
              explanation: "파이썬은 대소문자를 구분합니다. print 는 소문자로 써야 합니다.",
              starterCode: 'Print("안녕")      # ← 버그\n',
              testCases: [{ expected: "안녕" }],
            },
            {
              id: "py-u1-l1-c8",
              conceptTags: ["output"],
              type: "WRITE",
              language: "python",
              question: "정확히 다음 한 줄을 출력하는 프로그램을 작성하세요: 3 + 4 = 7",
              explanation:
                'print("3 + 4 = 7") 처럼 그대로 출력하거나, print(3, "+", 4, "=", 7) 처럼 값을 나열해도 됩니다.',
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [{ expected: "3 + 4 = 7" }],
            },
            {
              id: "py-u1-l1-c9",
              conceptTags: ["output"],
              type: "SELECT",
              language: "python",
              question: "다음 코드에서 \\n 은 무엇을 의미하나요?",
              codeSnippet: 'print("A\\nB")',
              explanation: "\\n 은 줄바꿈(개행) 문자입니다. A 와 B 가 서로 다른 줄에 출력됩니다.",
              options: [
                { id: "a", text: "줄바꿈(새 줄)", correct: true },
                { id: "b", text: "공백 한 칸", correct: false },
                { id: "c", text: "탭", correct: false },
                { id: "d", text: "아무 의미 없는 글자", correct: false },
              ],
            },
            {
              id: "py-u1-l1-c10",
              conceptTags: ["output", "variable"],
              type: "FILL",
              language: "python",
              question:
                "나이를 문자열에 이어 붙여 출력하려 합니다. 숫자를 문자열로 바꾸는 함수 이름을 빈칸에 채우세요.",
              explanation: "문자열과 숫자는 그냥 + 로 합칠 수 없어 str() 로 변환해야 합니다.",
              fillCode: 'age = 5\nprint("나이: " + {{0}}(age))',
              fillAnswers: [["str"]],
            },
          ],
        },
        {
          id: "py-u1-l2",
          title: "변수와 계산",
          challenges: [
            {
              id: "py-u1-l2-c1",
              conceptTags: ["variable", "operator"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "x = 5\ny = 3\nprint(x * y)",
              explanation: "* 는 곱셈입니다. 5 × 3 = 15.",
              options: [
                { id: "a", text: "15", correct: true },
                { id: "b", text: "8", correct: false },
                { id: "c", text: "53", correct: false },
                { id: "d", text: "x * y", correct: false },
              ],
            },
            {
              id: "py-u1-l2-c2",
              conceptTags: ["variable", "operator"],
              type: "WRITE",
              language: "python",
              question:
                "한 줄에 공백으로 구분된 정수 두 개를 입력받아, 그 합을 출력하세요.",
              explanation:
                "input().split() 으로 나누고 map(int, ...) 으로 정수 변환한 뒤 더하면 됩니다. x+=1 이든 x=x+1 이든 결과만 같으면 정답입니다.",
              starterCode:
                "# 예) 입력 '3 5' → 출력 '8'\na, b = input().split()\n",
              testCases: [
                { stdin: "3 5", expected: "8" },
                { stdin: "10 20", expected: "30" },
                { stdin: "-7 7", expected: "0", hidden: true },
              ],
            },
            {
              id: "py-u1-l2-c3",
              conceptTags: ["variable", "debug"],
              type: "BUGFIX",
              language: "python",
              question:
                "1부터 n까지의 합을 출력해야 하는데 결과가 이상합니다. 버그를 고치세요.",
              explanation:
                "range(n) 은 0부터 n-1 까지입니다. 1부터 n까지 돌려면 range(1, n+1) 이 필요합니다.",
              starterCode:
                "n = int(input())\ntotal = 0\nfor i in range(n):      # ← 버그\n    total += i\nprint(total)\n",
              testCases: [
                { stdin: "5", expected: "15" },
                { stdin: "10", expected: "55" },
                { stdin: "1", expected: "1", hidden: true },
              ],
            },
            {
              id: "py-u1-l2-c4",
              conceptTags: ["operator"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "print(7 // 2)",
              explanation: "// 는 몫만 구하는 정수 나눗셈입니다. 7 을 2 로 나눈 몫은 3.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "3.5", correct: false },
                { id: "c", text: "1", correct: false },
                { id: "d", text: "4", correct: false },
              ],
            },
            {
              id: "py-u1-l2-c5",
              conceptTags: ["operator"],
              type: "FILL",
              language: "python",
              question: "2의 5제곱이 출력되도록 빈칸을 채우세요.",
              explanation: "거듭제곱 연산자는 ** 입니다. 2**5 = 32.",
              fillCode: "print(2 {{0}} 5)",
              fillAnswers: [["**"]],
            },
            {
              id: "py-u1-l2-c6",
              conceptTags: ["variable"],
              type: "PARSONS",
              language: "python",
              question: "변수 a와 b의 값을 서로 바꿔(swap) 출력하도록 줄 순서를 맞추세요.",
              explanation: "파이썬은 a, b = b, a 로 두 변수를 한 번에 맞바꿀 수 있습니다.",
              parsonsLines: ["a = 1", "b = 2", "a, b = b, a", "print(a, b)"],
            },
            {
              id: "py-u1-l2-c7",
              conceptTags: ["variable", "debug"],
              type: "BUGFIX",
              language: "python",
              question: "변수 이름 대소문자 때문에 오류가 납니다. 버그를 고치세요.",
              explanation: "파이썬 변수명은 대소문자를 구분합니다. x 와 X 는 다른 변수입니다.",
              starterCode: "x = 10\nprint(X)      # ← 버그\n",
              testCases: [{ expected: "10" }],
            },
            {
              id: "py-u1-l2-c8",
              conceptTags: ["variable", "operator", "io"],
              type: "WRITE",
              language: "python",
              question:
                "공백으로 구분된 정수 세 개를 입력받아 평균을 정수(소수점 버림)로 출력하세요.",
              explanation: "세 수를 더한 뒤 // 3 으로 몫만 남기면 소수점이 버려집니다.",
              starterCode: "a, b, c = map(int, input().split())\n",
              testCases: [
                { stdin: "3 6 9", expected: "6" },
                { stdin: "1 2 2", expected: "1" },
                { stdin: "10 10 10", expected: "10", hidden: true },
              ],
            },
            {
              id: "py-u1-l2-c9",
              conceptTags: ["operator"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "print(10 % 3)",
              explanation: "% 는 나눗셈의 나머지를 구합니다. 10을 3으로 나누면 나머지는 1.",
              options: [
                { id: "a", text: "1", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "3.33", correct: false },
                { id: "d", text: "0", correct: false },
              ],
            },
            {
              id: "py-u1-l2-c10",
              conceptTags: ["variable", "operator", "io"],
              type: "WRITE",
              language: "python",
              question: "가로와 세로 길이를 입력받아 직사각형의 둘레를 출력하세요.",
              explanation: "둘레는 2 * (가로 + 세로) 로 계산합니다.",
              starterCode: "w, h = map(int, input().split())\n",
              testCases: [
                { stdin: "3 4", expected: "14" },
                { stdin: "5 5", expected: "20" },
                { stdin: "1 2", expected: "6", hidden: true },
              ],
            },
          ],
        },
        {
          id: "py-u1-l3",
          title: "문자열 다루기",
          challenges: [
            {
              id: "py-u1-l3-c1",
              conceptTags: ["variable", "io"],
              type: "PARSONS",
              language: "python",
              question:
                "이름을 입력받아  반가워, <이름>!  을 출력하도록 줄 순서를 맞추세요.",
              explanation:
                "먼저 입력을 받고(name), 인사말을 만든 뒤(greeting), 마지막에 출력합니다.",
              parsonsLines: [
                "name = input()",
                'greeting = "반가워, " + name + "!"',
                "print(greeting)",
              ],
            },
            {
              id: "py-u1-l3-c2",
              conceptTags: ["variable", "operator"],
              type: "FILL",
              language: "python",
              question: "두 변수를 더한 값이 출력되도록 빈칸을 채우세요.",
              explanation: "덧셈 연산자를 넣으면 됩니다.",
              fillCode: "x = 10\ny = 20\nprint(x {{0}} y)",
              fillAnswers: [["+"]],
            },
            {
              id: "py-u1-l3-c3",
              conceptTags: ["string"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: 's = "PYTHON"\nprint(s[1])',
              explanation:
                "인덱스는 0부터 시작합니다. s[0]='P', s[1]='Y' 입니다.",
              options: [
                { id: "a", text: "Y", correct: true },
                { id: "b", text: "P", correct: false },
                { id: "c", text: "O", correct: false },
                { id: "d", text: "PYTHON", correct: false },
              ],
            },
            {
              id: "py-u1-l3-c4",
              conceptTags: ["string"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: 's = "PYTHON"\nprint(s[1:4])',
              explanation:
                "슬라이싱 s[1:4] 는 인덱스 1부터 3까지(4는 포함 안 함)를 가져옵니다. 'YTH'.",
              options: [
                { id: "a", text: "YTH", correct: true },
                { id: "b", text: "YTHO", correct: false },
                { id: "c", text: "PYT", correct: false },
                { id: "d", text: "YTHON", correct: false },
              ],
            },
            {
              id: "py-u1-l3-c5",
              conceptTags: ["string"],
              type: "FILL",
              language: "python",
              question: "문자열의 길이를 출력하도록 빈칸을 채우세요.",
              explanation: "len() 은 문자열의 글자 수를 셉니다.",
              fillCode: 's = "hello"\nprint({{0}}(s))',
              fillAnswers: [["len"]],
            },
            {
              id: "py-u1-l3-c6",
              conceptTags: ["string", "variable"],
              type: "PARSONS",
              language: "python",
              question: "성과 이름을 합쳐 '홍길동' 을 출력하도록 줄 순서를 맞추세요.",
              explanation: "문자열을 + 로 이어 붙인 뒤 출력합니다.",
              parsonsLines: ['last = "홍"', 'first = "길동"', "full = last + first", "print(full)"],
            },
            {
              id: "py-u1-l3-c7",
              conceptTags: ["string", "debug"],
              type: "BUGFIX",
              language: "python",
              question: "범위를 벗어난 인덱스라 오류가 납니다. s의 첫 글자가 출력되도록 고치세요.",
              explanation: "'hi' 는 길이가 2라 인덱스는 0,1만 가능합니다. 첫 글자는 s[0].",
              starterCode: 's = "hi"\nprint(s[5])      # ← 버그\n',
              testCases: [{ expected: "h" }],
            },
            {
              id: "py-u1-l3-c8",
              conceptTags: ["string", "io"],
              type: "WRITE",
              language: "python",
              question: "문자열을 한 줄 입력받아 그 길이를 출력하세요.",
              explanation: "len() 으로 입력받은 문자열의 길이를 구해 출력합니다.",
              starterCode: "s = input()\n",
              testCases: [
                { stdin: "code", expected: "4" },
                { stdin: "hello world", expected: "11" },
                { stdin: "a", expected: "1", hidden: true },
              ],
            },
            {
              id: "py-u1-l3-c9",
              conceptTags: ["string"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: 'print("ab" * 3)',
              explanation: "문자열에 정수를 곱하면 그만큼 반복됩니다. 'ab'*3 = 'ababab'.",
              options: [
                { id: "a", text: "ababab", correct: true },
                { id: "b", text: "ab3", correct: false },
                { id: "c", text: "ab ab ab", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u1-l3-c10",
              conceptTags: ["string", "io"],
              type: "WRITE",
              language: "python",
              question: "두 문자열을 각각 한 줄씩 입력받아, 공백으로 이어 붙여 한 줄로 출력하세요.",
              explanation: '두 입력값을 a, b 로 받아 a + " " + b 로 이어 붙입니다.',
              starterCode: "a = input()\nb = input()\n",
              testCases: [
                { stdin: "코드\n런", expected: "코드 런" },
                { stdin: "hello\nworld", expected: "hello world" },
                { stdin: "py\nthon", expected: "py thon", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "py-u2",
      order: 2,
      title: "유닛 2 · 조건과 반복",
      description: "if 문과 for/while 로 흐름을 제어하기",
      lessons: [
        {
          id: "py-u2-l1",
          title: "조건문",
          challenges: [
            {
              id: "py-u2-l1-c1",
              conceptTags: ["condition"],
              type: "SELECT",
              language: "python",
              question: "x = 7 일 때 아래 코드의 출력은?",
              codeSnippet: "if x % 2 == 0:\n    print('짝')\nelse:\n    print('홀')",
              explanation: "7 % 2 는 1 이라 0이 아니므로 else 로 갑니다.",
              options: [
                { id: "a", text: "홀", correct: true },
                { id: "b", text: "짝", correct: false },
                { id: "c", text: "7", correct: false },
                { id: "d", text: "아무것도 출력 안 됨", correct: false },
              ],
            },
            {
              id: "py-u2-l1-c2",
              conceptTags: ["condition", "io"],
              type: "WRITE",
              language: "python",
              question:
                "정수 n을 입력받아 짝수면 '짝수', 홀수면 '홀수' 를 출력하세요.",
              explanation:
                "n % 2 == 0 이면 짝수입니다. 조건 표현식 print('짝수' if n%2==0 else '홀수') 도 정답입니다.",
              starterCode: "n = int(input())\n",
              testCases: [
                { stdin: "4", expected: "짝수" },
                { stdin: "7", expected: "홀수" },
                { stdin: "0", expected: "짝수", hidden: true },
              ],
            },
            {
              id: "py-u2-l1-c3",
              conceptTags: ["condition", "debug"],
              type: "BUGFIX",
              language: "python",
              question:
                "60점 이상이면 '합격' 이어야 하는데 딱 60점이 불합격으로 나옵니다. 고치세요.",
              explanation:
                "'이상' 은 경계값을 포함합니다. > 대신 >= 를 써야 60도 합격입니다.",
              starterCode:
                "score = int(input())\nif score > 60:      # ← 버그\n    print('합격')\nelse:\n    print('불합격')\n",
              testCases: [
                { stdin: "60", expected: "합격" },
                { stdin: "59", expected: "불합격" },
                { stdin: "100", expected: "합격", hidden: true },
              ],
            },
            {
              id: "py-u2-l1-c4",
              conceptTags: ["condition"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet:
                "x = 85\nif x >= 90:\n    print('A')\nelif x >= 80:\n    print('B')\nelse:\n    print('C')",
              explanation:
                "85는 90 이상이 아니지만 80 이상이므로 elif 조건에서 'B' 가 출력됩니다.",
              options: [
                { id: "a", text: "B", correct: true },
                { id: "b", text: "A", correct: false },
                { id: "c", text: "C", correct: false },
                { id: "d", text: "아무것도 출력 안 됨", correct: false },
              ],
            },
            {
              id: "py-u2-l1-c5",
              conceptTags: ["condition", "operator"],
              type: "FILL",
              language: "python",
              question: "n이 10 이상일 때 '통과' 가 출력되도록 빈칸을 채우세요.",
              explanation: "'이상' 은 크거나 같다는 뜻이므로 >= 를 사용합니다.",
              fillCode: "n = 10\nif n {{0}} 10:\n    print('통과')",
              fillAnswers: [[">="]],
            },
            {
              id: "py-u2-l1-c6",
              conceptTags: ["condition"],
              type: "PARSONS",
              language: "python",
              question:
                "점수에 따라 A/B/C 학점을 출력하도록 줄 순서를 맞추세요 (90 이상 A, 80 이상 B, 나머지 C).",
              explanation:
                "조건은 위에서부터 순서대로 검사되며, 처음 참인 조건의 블록만 실행됩니다.",
              parsonsLines: [
                "score = 75",
                "if score >= 90:",
                "    print('A')",
                "elif score >= 80:",
                "    print('B')",
                "else:",
                "    print('C')",
              ],
            },
            {
              id: "py-u2-l1-c7",
              conceptTags: ["condition", "debug"],
              type: "BUGFIX",
              language: "python",
              question:
                "점수가 60~100 범위일 때만 '합격' 이 출력되어야 하는데, 범위를 벗어나도 항상 합격이 나옵니다. 버그를 고치세요.",
              explanation:
                "or 는 둘 중 하나만 참이어도 되므로 범위를 제한하지 못합니다. 두 조건을 모두 만족해야 하므로 and 를 써야 합니다.",
              starterCode:
                "score = int(input())\nif score >= 60 or score <= 100:      # ← 버그\n    print('합격')\nelse:\n    print('불합격')\n",
              testCases: [
                { stdin: "70", expected: "합격" },
                { stdin: "150", expected: "불합격" },
                { stdin: "-5", expected: "불합격", hidden: true },
              ],
            },
            {
              id: "py-u2-l1-c8",
              conceptTags: ["condition", "io"],
              type: "WRITE",
              language: "python",
              question:
                "정수를 입력받아 양수면 '양수', 음수면 '음수', 0이면 '0' 을 출력하세요.",
              explanation: "n > 0, n < 0, 그 외(0) 세 경우로 나누어 판단합니다.",
              starterCode: "n = int(input())\n",
              testCases: [
                { stdin: "5", expected: "양수" },
                { stdin: "-3", expected: "음수" },
                { stdin: "0", expected: "0", hidden: true },
              ],
            },
            {
              id: "py-u2-l1-c9",
              conceptTags: ["condition"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet:
                "x = 5\ny = 10\nif x > 0 and y > 0:\n    print('둘 다 양수')\nelse:\n    print('아니오')",
              explanation:
                "x와 y 모두 0보다 크므로 and 조건이 참이 되어 '둘 다 양수' 가 출력됩니다.",
              options: [
                { id: "a", text: "둘 다 양수", correct: true },
                { id: "b", text: "아니오", correct: false },
                { id: "c", text: "5", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u2-l1-c10",
              conceptTags: ["condition", "io"],
              type: "WRITE",
              language: "python",
              question: "세 정수를 입력받아 그 중 가장 큰 값을 출력하세요.",
              explanation: "max(a, b, c) 를 쓰거나, if/elif 로 직접 비교해도 됩니다.",
              starterCode: "a, b, c = map(int, input().split())\n",
              testCases: [
                { stdin: "3 7 5", expected: "7" },
                { stdin: "10 2 8", expected: "10" },
                { stdin: "1 1 1", expected: "1", hidden: true },
              ],
            },
          ],
        },
        {
          id: "py-u2-l2",
          title: "반복문",
          challenges: [
            {
              id: "py-u2-l2-c1",
              conceptTags: ["loop"],
              type: "PARSONS",
              language: "python",
              question: "1부터 5까지의 합을 출력하도록 줄 순서를 맞추세요.",
              explanation:
                "합을 담을 변수를 0으로 초기화하고, 반복하며 더한 뒤, 마지막에 출력합니다.",
              parsonsLines: [
                "total = 0",
                "for i in range(1, 6):",
                "    total += i",
                "print(total)",
              ],
            },
            {
              id: "py-u2-l2-c2",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "python",
              question:
                "정수 n을 입력받아 1부터 n까지의 곱(n!)을 출력하세요.",
              explanation:
                "1로 시작하는 변수에 1..n 을 차례로 곱합니다. 5! = 120.",
              starterCode: "n = int(input())\n",
              testCases: [
                { stdin: "5", expected: "120" },
                { stdin: "3", expected: "6" },
                { stdin: "1", expected: "1", hidden: true },
              ],
            },
            {
              id: "py-u2-l2-c3",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "python",
              question:
                "아래 코드가 출력하는 마지막 숫자는?",
              codeSnippet: "for i in range(3):\n    print(i)",
              explanation: "range(3) 은 0, 1, 2 를 만듭니다. 마지막은 2.",
              options: [
                { id: "a", text: "2", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "0", correct: false },
                { id: "d", text: "1", correct: false },
              ],
            },
            {
              id: "py-u2-l2-c4",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력 줄 수는 몇 줄인가요?",
              codeSnippet: "i = 0\nwhile i < 3:\n    print(i)\n    i += 1",
              explanation: "i 가 0,1,2 일 때 조건 i<3 이 참이라 3번 반복하며 출력합니다.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "2", correct: false },
                { id: "c", text: "4", correct: false },
                { id: "d", text: "무한 반복", correct: false },
              ],
            },
            {
              id: "py-u2-l2-c5",
              conceptTags: ["loop"],
              type: "FILL",
              language: "python",
              question: "1부터 10까지 출력되도록 빈칸을 채우세요.",
              explanation: "range(1, 11) 은 1부터 10까지를 만듭니다(11은 포함 안 됨).",
              fillCode: "for i in range(1, {{0}}):\n    print(i)",
              fillAnswers: [["11"]],
            },
            {
              id: "py-u2-l2-c6",
              conceptTags: ["loop"],
              type: "PARSONS",
              language: "python",
              question: "5부터 1까지 거꾸로 출력하도록 줄 순서를 맞추세요.",
              explanation: "range(5, 0, -1) 은 5부터 1까지 1씩 감소합니다.",
              parsonsLines: ["for i in range(5, 0, -1):", "    print(i)"],
            },
            {
              id: "py-u2-l2-c7",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "python",
              question: "1부터 5까지 출력해야 하는데 5가 빠집니다. 버그를 고치세요.",
              explanation: "i < 5 는 5를 포함하지 않습니다. i <= 5 로 고쳐야 5까지 출력됩니다.",
              starterCode: "i = 1\nwhile i < 5:      # ← 버그\n    print(i)\n    i += 1\n",
              testCases: [{ expected: "1\n2\n3\n4\n5" }],
            },
            {
              id: "py-u2-l2-c8",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "python",
              question: "정수 n을 입력받아 1부터 n까지 한 줄에 하나씩 출력하세요.",
              explanation: "range(1, n+1) 로 반복하며 각 값을 한 줄씩 출력합니다.",
              starterCode: "n = int(input())\n",
              testCases: [
                { stdin: "3", expected: "1\n2\n3" },
                { stdin: "1", expected: "1" },
                { stdin: "5", expected: "1\n2\n3\n4\n5", hidden: true },
              ],
            },
            {
              id: "py-u2-l2-c9",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "python",
              question: "다음 코드가 마지막으로 출력하는 값은?",
              codeSnippet: "for i in range(10):\n    if i == 3:\n        break\n    print(i)",
              explanation:
                "i가 3이 되면 break로 반복이 즉시 멈추므로, 그 직전인 2까지만 출력됩니다.",
              options: [
                { id: "a", text: "2", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "9", correct: false },
                { id: "d", text: "아무것도 출력 안 됨", correct: false },
              ],
            },
            {
              id: "py-u2-l2-c10",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "python",
              question: "정수 n을 입력받아 1부터 n까지의 짝수의 합을 출력하세요.",
              explanation: "range(2, n+1, 2) 로 짝수만 돌며 더하거나, 조건문으로 걸러도 됩니다.",
              starterCode: "n = int(input())\n",
              testCases: [
                { stdin: "10", expected: "30" },
                { stdin: "5", expected: "6" },
                { stdin: "1", expected: "0", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "py-u3",
      order: 3,
      title: "유닛 3 · 리스트와 문자열",
      description: "여러 값을 리스트에 담고, 문자열을 다루는 법",
      lessons: [
        {
          id: "py-u3-l1",
          title: "리스트 다루기",
          challenges: [
            {
              id: "py-u3-l1-c1",
              conceptTags: ["list"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "nums = [10, 20, 30]\nprint(len(nums))",
              explanation: "len() 은 리스트의 원소 개수를 셉니다. 원소가 3개이므로 3.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "30", correct: false },
                { id: "c", text: "2", correct: false },
                { id: "d", text: "[10, 20, 30]", correct: false },
              ],
            },
            {
              id: "py-u3-l1-c2",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "python",
              question:
                "한 줄에 공백으로 구분된 정수 여러 개를 입력받아 리스트에 담고, 그 총합을 출력하세요.",
              explanation:
                "input().split() 으로 나눈 뒤 map(int, ...) 으로 정수 리스트를 만들고, sum() 으로 더하면 됩니다.",
              starterCode:
                "# 예) 입력 '1 2 3 4 5' → 출력 '15'\nnums = list(map(int, input().split()))\n",
              testCases: [
                { stdin: "1 2 3 4 5", expected: "15" },
                { stdin: "10 20", expected: "30" },
                { stdin: "0", expected: "0", hidden: true },
              ],
            },
            {
              id: "py-u3-l1-c3",
              conceptTags: ["list", "debug"],
              type: "BUGFIX",
              language: "python",
              question:
                "리스트의 마지막 원소를 출력해야 하는데 범위 오류(IndexError)가 납니다. 버그를 고치세요.",
              explanation:
                "인덱스는 0부터 시작해 마지막 원소는 len(nums)-1 입니다. len(nums) 는 범위를 벗어납니다.",
              starterCode: "nums = [10, 20, 30]\nprint(nums[len(nums)])      # ← 버그\n",
              testCases: [{ expected: "30" }],
            },
            {
              id: "py-u3-l1-c4",
              conceptTags: ["list"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "nums = [10, 20, 30]\nprint(nums[-1])",
              explanation: "음수 인덱스는 뒤에서부터 셉니다. -1은 마지막 원소인 30입니다.",
              options: [
                { id: "a", text: "30", correct: true },
                { id: "b", text: "10", correct: false },
                { id: "c", text: "오류가 납니다", correct: false },
                { id: "d", text: "20", correct: false },
              ],
            },
            {
              id: "py-u3-l1-c5",
              conceptTags: ["list"],
              type: "FILL",
              language: "python",
              question: "리스트에 40을 추가하도록 빈칸을 채우세요.",
              explanation: "리스트 끝에 값을 추가할 때는 append() 를 사용합니다.",
              fillCode: "nums = [10, 20, 30]\nnums.{{0}}(40)\nprint(nums)",
              fillAnswers: [["append"]],
            },
            {
              id: "py-u3-l1-c6",
              conceptTags: ["list"],
              type: "PARSONS",
              language: "python",
              question: "리스트에서 가장 큰 값을 출력하도록 줄 순서를 맞추세요.",
              explanation: "max() 함수로 리스트에서 가장 큰 값을 바로 구할 수 있습니다.",
              parsonsLines: ["nums = [3, 7, 2, 9, 4]", "biggest = max(nums)", "print(biggest)"],
            },
            {
              id: "py-u3-l1-c7",
              conceptTags: ["list", "debug"],
              type: "BUGFIX",
              language: "python",
              question: "리스트에 값을 추가하려는데 오류가 납니다. 버그를 고치세요.",
              explanation: "리스트는 add() 가 아니라 append() 로 값을 추가합니다.",
              starterCode: "nums = [1, 2, 3]\nnums.add(4)      # ← 버그\nprint(nums)\n",
              testCases: [{ expected: "[1, 2, 3, 4]" }],
            },
            {
              id: "py-u3-l1-c8",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "python",
              question: "공백으로 구분된 정수 여러 개를 입력받아, 그 중 최댓값을 출력하세요.",
              explanation: "리스트로 받은 뒤 max() 로 최댓값을 구합니다.",
              starterCode: "nums = list(map(int, input().split()))\n",
              testCases: [
                { stdin: "3 7 2", expected: "7" },
                { stdin: "10 20", expected: "20" },
                { stdin: "5", expected: "5", hidden: true },
              ],
            },
            {
              id: "py-u3-l1-c9",
              conceptTags: ["list"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "nums = [1, 2, 3, 4, 5]\nprint(nums[1:3])",
              explanation: "nums[1:3] 은 인덱스 1,2 원소를 가져옵니다. [2, 3].",
              options: [
                { id: "a", text: "[2, 3]", correct: true },
                { id: "b", text: "[1, 2, 3]", correct: false },
                { id: "c", text: "[2, 3, 4]", correct: false },
                { id: "d", text: "[3, 4]", correct: false },
              ],
            },
            {
              id: "py-u3-l1-c10",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "python",
              question: "공백으로 구분된 정수 여러 개를 입력받아, 그 중 짝수의 개수를 출력하세요.",
              explanation: "리스트를 돌며 2로 나눈 나머지가 0인 값의 개수를 셉니다.",
              starterCode: "nums = list(map(int, input().split()))\n",
              testCases: [
                { stdin: "1 2 3 4 5 6", expected: "3" },
                { stdin: "1 3 5", expected: "0" },
                { stdin: "2 4 6 8", expected: "4", hidden: true },
              ],
            },
          ],
        },
        {
          id: "py-u3-l2",
          title: "문자열 메서드",
          challenges: [
            {
              id: "py-u3-l2-c1",
              conceptTags: ["string"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: 's = "Hello"\nprint(s.upper())',
              explanation: "upper() 는 문자열의 모든 글자를 대문자로 바꿉니다.",
              options: [
                { id: "a", text: "HELLO", correct: true },
                { id: "b", text: "hello", correct: false },
                { id: "c", text: "Hello", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u3-l2-c2",
              conceptTags: ["string"],
              type: "FILL",
              language: "python",
              question: "문자열을 소문자로 바꿔 출력하도록 빈칸을 채우세요.",
              explanation: "소문자로 바꾸는 메서드는 lower() 입니다.",
              fillCode: 's = "PYTHON"\nprint(s.{{0}}())',
              fillAnswers: [["lower"]],
            },
            {
              id: "py-u3-l2-c3",
              conceptTags: ["string", "io"],
              type: "WRITE",
              language: "python",
              question: "문자열을 한 줄 입력받아, 앞뒤 공백을 제거하고 출력하세요.",
              explanation: "strip() 은 문자열 양 끝의 공백(스페이스, 탭, 개행)을 제거합니다.",
              starterCode: "s = input()\n",
              testCases: [
                { stdin: "  hi  ", expected: "hi" },
                { stdin: "code", expected: "code" },
                { stdin: "   run  ", expected: "run", hidden: true },
              ],
            },
            {
              id: "py-u3-l2-c4",
              conceptTags: ["string"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: 's = "banana"\nprint(s.replace("a", "o"))',
              explanation: "replace('a','o') 는 문자열 안의 모든 'a' 를 'o' 로 바꿉니다.",
              options: [
                { id: "a", text: "bonono", correct: true },
                { id: "b", text: "banana", correct: false },
                { id: "c", text: "bonana", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u3-l2-c5",
              conceptTags: ["string"],
              type: "FILL",
              language: "python",
              question: "공백을 기준으로 문자열을 나누도록 빈칸을 채우세요.",
              explanation: "split() 은 공백을 기준으로 문자열을 나눠 리스트로 만듭니다.",
              fillCode: 's = "hello world"\nprint(s.{{0}}())',
              fillAnswers: [["split"]],
            },
            {
              id: "py-u3-l2-c6",
              conceptTags: ["string", "list"],
              type: "PARSONS",
              language: "python",
              question:
                "리스트의 단어들을 공백으로 이어 하나의 문자열로 만들어 출력하도록 줄 순서를 맞추세요.",
              explanation: "'구분자'.join(리스트) 는 리스트의 원소들을 구분자로 이어 붙입니다.",
              parsonsLines: ['words = ["코드", "런", "화이팅"]', 'result = " ".join(words)', "print(result)"],
            },
            {
              id: "py-u3-l2-c7",
              conceptTags: ["string", "debug"],
              type: "BUGFIX",
              language: "python",
              question: "메서드 이름 오타 때문에 오류가 납니다. 버그를 고치세요.",
              explanation: "파이썬 문자열 메서드는 startswith() 입니다(모두 소문자, 대문자 W 아님).",
              starterCode:
                's = "python"\nif s.startWith("py"):      # ← 버그\n    print("맞음")\nelse:\n    print("아님")\n',
              testCases: [{ expected: "맞음" }],
            },
            {
              id: "py-u3-l2-c8",
              conceptTags: ["string", "io"],
              type: "WRITE",
              language: "python",
              question: "문자열을 한 줄 입력받아, 그 안에 'e' 가 몇 번 나오는지 출력하세요.",
              explanation: "count() 메서드로 특정 글자의 개수를 바로 셀 수 있습니다.",
              starterCode: "s = input()\n",
              testCases: [
                { stdin: "apple", expected: "1" },
                { stdin: "elephant", expected: "2" },
                { stdin: "banana", expected: "0", hidden: true },
              ],
            },
            {
              id: "py-u3-l2-c9",
              conceptTags: ["string"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: 's = "mississippi"\nprint(s.count("s"))',
              explanation:
                "count('s') 는 문자열 안에서 's' 가 나오는 횟수를 셉니다. mississippi 에는 s가 4번 있습니다.",
              options: [
                { id: "a", text: "4", correct: true },
                { id: "b", text: "2", correct: false },
                { id: "c", text: "3", correct: false },
                { id: "d", text: "11", correct: false },
              ],
            },
            {
              id: "py-u3-l2-c10",
              conceptTags: ["string", "io"],
              type: "WRITE",
              language: "python",
              question: "문자열을 한 줄 입력받아, 거꾸로 뒤집어 출력하세요.",
              explanation: "s[::-1] 처럼 슬라이싱으로 문자열을 뒤집을 수 있습니다.",
              starterCode: "s = input()\n",
              testCases: [
                { stdin: "hello", expected: "olleh" },
                { stdin: "코딩고링", expected: "링고딩코" },
                { stdin: "ab", expected: "ba", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "py-u4",
      order: 4,
      title: "유닛 4 · 함수",
      description: "코드를 함수로 묶어 재사용하기",
      lessons: [
        {
          id: "py-u4-l1",
          title: "함수 정의하기",
          challenges: [
            {
              id: "py-u4-l1-c1",
              conceptTags: ["function"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "def add(a, b):\n    return a + b\n\nprint(add(3, 4))",
              explanation: "add(3, 4) 는 3 + 4 를 계산해 7을 반환합니다.",
              options: [
                { id: "a", text: "7", correct: true },
                { id: "b", text: "34", correct: false },
                { id: "c", text: "a + b", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u4-l1-c2",
              conceptTags: ["function", "io"],
              type: "PARSONS",
              language: "python",
              question: "정수를 입력받아 2배로 만들어 출력하도록 줄 순서를 맞추세요.",
              explanation: "함수를 먼저 정의하고, 입력을 받은 뒤, 함수를 호출해 출력합니다.",
              parsonsLines: [
                "def double(n):",
                "    return n * 2",
                "x = int(input())",
                "print(double(x))",
              ],
            },
            {
              id: "py-u4-l1-c3",
              conceptTags: ["function", "io"],
              type: "WRITE",
              language: "python",
              question:
                "정수 n을 입력받아 n의 제곱을 반환하는 함수 square(n)을 작성하고, 그 결과를 출력하세요.",
              explanation: "함수 안에서 n * n 을 return 하면 됩니다.",
              starterCode:
                "def square(n):\n    # 여기에 코드를 작성하세요\n    pass\n\nn = int(input())\nprint(square(n))\n",
              testCases: [
                { stdin: "5", expected: "25" },
                { stdin: "3", expected: "9" },
                { stdin: "0", expected: "0", hidden: true },
              ],
            },
            {
              id: "py-u4-l1-c4",
              conceptTags: ["function"],
              type: "SELECT",
              language: "python",
              question: "다음 코드에서 print(result) 는 무엇을 출력하나요?",
              codeSnippet: "def greet():\n    print('Hi')\n\nresult = greet()\nprint(result)",
              explanation: "greet() 함수에는 return 문이 없으므로 반환값은 None 입니다.",
              options: [
                { id: "a", text: "None", correct: true },
                { id: "b", text: "Hi", correct: false },
                { id: "c", text: "빈 문자열", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u4-l1-c5",
              conceptTags: ["function"],
              type: "FILL",
              language: "python",
              question: "함수가 a와 b의 곱을 반환하도록 빈칸을 채우세요.",
              explanation: "함수의 결과값을 돌려주려면 return 을 사용합니다.",
              fillCode: "def multiply(a, b):\n    {{0}} a * b\n\nprint(multiply(3, 4))",
              fillAnswers: [["return"]],
            },
            {
              id: "py-u4-l1-c6",
              conceptTags: ["function", "condition"],
              type: "PARSONS",
              language: "python",
              question: "두 수 중 큰 값을 반환하는 함수를 만들어 호출하도록 줄 순서를 맞추세요.",
              explanation: "a가 b보다 크면 a를, 아니면 b를 반환합니다.",
              parsonsLines: [
                "def bigger(a, b):",
                "    if a > b:",
                "        return a",
                "    return b",
                "print(bigger(3, 7))",
              ],
            },
            {
              id: "py-u4-l1-c7",
              conceptTags: ["function", "debug"],
              type: "BUGFIX",
              language: "python",
              question: "제곱값이 출력되어야 하는데 None 이 출력됩니다. 버그를 고치세요.",
              explanation:
                "계산만 하고 return 하지 않으면 함수는 None 을 돌려줍니다. return n * n 으로 고쳐야 합니다.",
              starterCode: "def square(n):\n    n * n      # ← 버그\n\nprint(square(4))\n",
              testCases: [{ expected: "16" }],
            },
            {
              id: "py-u4-l1-c8",
              conceptTags: ["function", "condition", "io"],
              type: "WRITE",
              language: "python",
              question:
                "정수를 입력받아 짝수인지 판별하는 함수 is_even(n) 을 작성하고, 짝수면 'True', 홀수면 'False' 를 출력하세요.",
              explanation: "n % 2 == 0 의 결과(True/False)를 그대로 반환하면 됩니다.",
              starterCode:
                "def is_even(n):\n    # 여기에 코드를 작성하세요\n    pass\n\nn = int(input())\nprint(is_even(n))\n",
              testCases: [
                { stdin: "4", expected: "True" },
                { stdin: "7", expected: "False" },
                { stdin: "0", expected: "True", hidden: true },
              ],
            },
            {
              id: "py-u4-l1-c9",
              conceptTags: ["function", "variable"],
              type: "SELECT",
              language: "python",
              question: "마지막 print(x) 는 무엇을 출력하나요?",
              codeSnippet: "x = 10\n\ndef change():\n    x = 20\n    print(x)\n\nchange()\nprint(x)",
              explanation:
                "함수 안의 x = 20 은 지역 변수를 새로 만드는 것이라, 함수 밖의 전역 변수 x(10)에는 영향을 주지 않습니다.",
              options: [
                { id: "a", text: "10", correct: true },
                { id: "b", text: "20", correct: false },
                { id: "c", text: "오류가 납니다", correct: false },
                { id: "d", text: "None", correct: false },
              ],
            },
            {
              id: "py-u4-l1-c10",
              conceptTags: ["function", "io"],
              type: "WRITE",
              language: "python",
              question:
                "밑변과 높이를 입력받아 삼각형의 넓이를 반환하는 함수 triangle_area(base, height) 를 작성하고, 결과를 출력하세요. (밑변 × 높이 ÷ 2)",
              explanation: "base * height / 2 를 return 하면 됩니다.",
              starterCode:
                "def triangle_area(base, height):\n    # 여기에 코드를 작성하세요\n    pass\n\nb, h = map(int, input().split())\nprint(triangle_area(b, h))\n",
              testCases: [
                { stdin: "4 6", expected: "12.0" },
                { stdin: "5 3", expected: "7.5" },
                { stdin: "10 2", expected: "10.0", hidden: true },
              ],
            },
          ],
        },
        {
          id: "py-u4-l2",
          title: "중첩 반복문",
          challenges: [
            {
              id: "py-u4-l2-c1",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "python",
              question: "다음 코드는 총 몇 번 출력되나요?",
              codeSnippet:
                "for i in range(2):\n    for j in range(2):\n        print(i, j)",
              explanation: "바깥 반복 2번 × 안쪽 반복 2번 = 4번 출력됩니다.",
              options: [
                { id: "a", text: "4", correct: true },
                { id: "b", text: "2", correct: false },
                { id: "c", text: "8", correct: false },
                { id: "d", text: "0", correct: false },
              ],
            },
            {
              id: "py-u4-l2-c2",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "python",
              question:
                "구구단처럼 n단을 1부터 n까지 출력해야 하는데, 마지막 줄(n x n)이 빠집니다. 버그를 고치세요.",
              explanation:
                "range(1, n) 은 n을 포함하지 않습니다. range(1, n+1) 이어야 n x n 까지 나옵니다.",
              starterCode:
                'n = int(input())\nfor i in range(1, n):      # ← 버그\n    print(n, "x", i, "=", n*i)\n',
              testCases: [{ stdin: "3", expected: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9" }],
            },
            {
              id: "py-u4-l2-c3",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "python",
              question:
                "정수 n을 입력받아, '*' 을 n개 이어붙인 줄을 n번 출력하세요 (n×n 정사각형).",
              explanation:
                '"*" * n 은 별표를 n번 반복한 문자열을 만듭니다. 그 줄을 n번 출력하면 됩니다.',
              starterCode: "n = int(input())\n",
              testCases: [
                { stdin: "3", expected: "***\n***\n***" },
                { stdin: "1", expected: "*" },
                { stdin: "2", expected: "**\n**", hidden: true },
              ],
            },
            {
              id: "py-u4-l2-c4",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "python",
              question: "다음 코드는 총 몇 번 출력되나요?",
              codeSnippet: "for i in range(2):\n    for j in range(3):\n        print(i, j)",
              explanation: "바깥 반복 2번 × 안쪽 반복 3번 = 6번 출력됩니다.",
              options: [
                { id: "a", text: "6", correct: true },
                { id: "b", text: "5", correct: false },
                { id: "c", text: "2", correct: false },
                { id: "d", text: "3", correct: false },
              ],
            },
            {
              id: "py-u4-l2-c5",
              conceptTags: ["loop"],
              type: "FILL",
              language: "python",
              question: "안쪽 반복문이 각 줄마다 3번씩 돌도록 빈칸을 채우세요.",
              explanation: "range(3) 은 0,1,2 로 3번 반복합니다.",
              fillCode: "for i in range(2):\n    for j in range({{0}}):\n        print(i, j)",
              fillAnswers: [["3"]],
            },
            {
              id: "py-u4-l2-c6",
              conceptTags: ["loop"],
              type: "PARSONS",
              language: "python",
              question: "3단을 1부터 9까지 출력하도록(3 x 1 = 3 형태) 줄 순서를 맞추세요.",
              explanation: "n을 고정하고 i를 1부터 9까지 돌리며 곱을 출력합니다.",
              parsonsLines: ["n = 3", "for i in range(1, 10):", '    print(n, "x", i, "=", n * i)'],
            },
            {
              id: "py-u4-l2-c7",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "python",
              question:
                "1층엔 별 1개, 2층엔 2개, 3층엔 3개로 늘어나는 계단 모양이어야 하는데 항상 3개씩 출력됩니다. 버그를 고치세요.",
              explanation:
                '매 줄 n개가 아니라 그 줄 번호인 i개만큼 출력해야 합니다. "*" * i 로 고칩니다.',
              starterCode: 'n = 3\nfor i in range(1, n+1):\n    print("*" * n)      # ← 버그\n',
              testCases: [{ expected: "*\n**\n***" }],
            },
            {
              id: "py-u4-l2-c8",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "python",
              question:
                "정수 n을 입력받아, 1층엔 별 1개, 2층엔 별 2개, ..., n층엔 별 n개인 계단 모양을 출력하세요.",
              explanation: '각 줄 i에 대해 "*" * i 를 출력하면 됩니다.',
              starterCode: "n = int(input())\n",
              testCases: [
                { stdin: "3", expected: "*\n**\n***" },
                { stdin: "1", expected: "*" },
                { stdin: "4", expected: "*\n**\n***\n****", hidden: true },
              ],
            },
            {
              id: "py-u4-l2-c9",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "total = 0\nfor i in range(1, 3):\n    for j in range(1, 3):\n        total += i * j\nprint(total)",
              explanation: "i,j 가 각각 1~2일 때 i*j 의 합은 1+2+2+4 = 9 입니다.",
              options: [
                { id: "a", text: "9", correct: true },
                { id: "b", text: "6", correct: false },
                { id: "c", text: "4", correct: false },
                { id: "d", text: "5", correct: false },
              ],
            },
            {
              id: "py-u4-l2-c10",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "python",
              question:
                "행의 개수 r과 열의 개수 c를 입력받아, '#'로 이루어진 r×c 직사각형을 출력하세요.",
              explanation: '"#" * c 로 이루어진 한 줄을 r번 출력하면 됩니다.',
              starterCode: "r, c = map(int, input().split())\n",
              testCases: [
                { stdin: "2 3", expected: "###\n###" },
                { stdin: "1 4", expected: "####" },
                { stdin: "3 1", expected: "#\n#\n#", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "py-u5",
      order: 5,
      title: "유닛 5 · 딕셔너리",
      description: "키와 값으로 데이터를 묶어 관리하기",
      lessons: [
        {
          id: "py-u5-l1",
          title: "딕셔너리 다루기",
          challenges: [
            {
              id: "py-u5-l1-c1",
              conceptTags: [
                "dict"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 딕셔너리에서 특정 키의 값을 조회하는 프로그램을 작성하세요.\n예시\n입력: {'apple': 1, 'banana': 2, 'orange': 3}\nbanana\n출력: 2",
              explanation: "이 문제는 파이썬의 딕셔너리를 사용하여 키에 해당하는 값을 조회하는 방법을 연습하는 것입니다. 사용자는 입력으로 주어진 딕셔너리에서 특정 키의 값을 찾아 출력해야 합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "{'apple': 1, 'banana': 2, 'orange': 3}\napple",
                  expected: "1"
                },
                {
                  stdin: "{'cat': 5, 'dog': 10}\nbird",
                  expected: "키가 존재하지 않습니다."
                },
                {
                  stdin: "{'x': 100, 'y': 200}\ny",
                  expected: "200",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u5-l1-c2",
              conceptTags: [
                "dict"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 키와 값을 사용하여 딕셔너리에 값을 추가하고, 만약 키가 이미 존재한다면 그 값을 누적하는 프로그램을 작성하세요.\n예시\n입력: 3\napple 2\nbanana 3\napple 5\n출력: apple 7\nbanana 3",
              explanation: "이 문제는 파이썬의 딕셔너리를 사용하여 주어진 키와 값을 누적하는 방법을 연습하는 것입니다. 입력으로 주어진 키에 대해 값을 누적하고, 최종적으로 각 키와 누적된 값을 출력하는 방식입니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "2\norange 4\norange 6",
                  expected: "orange 10"
                },
                {
                  stdin: "4\ngrape 1\ngrape 2\nkiwi 3\nkiwi 1",
                  expected: "grape 3\nkiwi 4"
                },
                {
                  stdin: "5\nmango 5\nmango 5\nmango 5\npeach 2\npeach 3",
                  expected: "mango 15\npeach 5",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u5-l1-c3",
              conceptTags: [
                "dict"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 문자열에서 각 단어의 빈도수를 세고, 그 결과를 딕셔너리 형태로 반환하는 프로그램을 작성하세요.\n예시\n입력: apple banana apple orange banana apple\n출력: {'apple': 3, 'banana': 2, 'orange': 1}",
              explanation: "이 문제는 주어진 문자열을 공백으로 나누어 단어 리스트를 만든 후, 각 단어의 빈도수를 세기 위해 딕셔너리를 사용합니다. 딕셔너리의 키는 단어, 값은 그 단어의 빈도수입니다. 반복문을 통해 각 단어의 빈도수를 계산하고, 최종적으로 딕셔너리를 반환합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "hello world hello",
                  expected: "{'hello': 2, 'world': 1}"
                },
                {
                  stdin: "python is fun python is great",
                  expected: "{'python': 2, 'is': 2, 'fun': 1, 'great': 1}"
                },
                {
                  stdin: "coding is fun coding is great coding",
                  expected: "{'coding': 3, 'is': 2, 'fun': 1, 'great': 1}",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u5-l1-c4",
              conceptTags: ["dict"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: 'd = {"a": 1, "b": 2}\nprint(d["b"])',
              explanation: "대괄호 안에 키를 넣으면 그 키에 해당하는 값을 가져옵니다. d['b'] 는 2.",
              options: [
                { id: "a", text: "2", correct: true },
                { id: "b", text: "b", correct: false },
                { id: "c", text: "1", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u5-l1-c5",
              conceptTags: ["dict"],
              type: "FILL",
              language: "python",
              question: "존재하지 않는 키를 조회할 때 오류 대신 기본값 0을 반환하도록 빈칸을 채우세요.",
              explanation: "get(키, 기본값) 은 키가 없을 때 오류 대신 기본값을 돌려줍니다.",
              fillCode: 'd = {"a": 1}\nprint(d.{{0}}("b", 0))',
              fillAnswers: [["get"]],
            },
            {
              id: "py-u5-l1-c6",
              conceptTags: ["dict"],
              type: "PARSONS",
              language: "python",
              question: "이름과 점수를 담은 딕셔너리를 만들어 점수를 출력하도록 줄 순서를 맞추세요.",
              explanation: "빈 딕셔너리를 만든 뒤 대괄호로 키를 지정해 값을 저장할 수 있습니다.",
              parsonsLines: ["scores = {}", 'scores["코딩고링"] = 95', 'print(scores["코딩고링"])'],
            },
            {
              id: "py-u5-l1-c7",
              conceptTags: ["dict", "debug"],
              type: "BUGFIX",
              language: "python",
              question: "키의 대소문자가 달라 오류가 납니다. 버그를 고치세요.",
              explanation: "딕셔너리 키도 문자열이라 대소문자를 구분합니다. 'apple' 로 고쳐야 합니다.",
              starterCode: 'd = {"apple": 1}\nprint(d["Apple"])      # ← 버그\n',
              testCases: [{ expected: "1" }],
            },
            {
              id: "py-u5-l1-c8",
              conceptTags: ["dict", "io"],
              type: "WRITE",
              language: "python",
              question:
                "첫 줄에 개수 n, 이후 n줄에 '키 값' 이 주어집니다. 각 항목을 'key: value' 형식으로 한 줄씩 출력하세요.",
              explanation:
                "입력받은 순서대로 딕셔너리에 저장한 뒤, items() 로 순회하며 출력하면 됩니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "2\napple 1\nbanana 2", expected: "apple: 1\nbanana: 2" },
                { stdin: "1\ncat 5", expected: "cat: 5" },
                { stdin: "3\nx 1\ny 2\nz 3", expected: "x: 1\ny: 2\nz: 3", hidden: true },
              ],
            },
            {
              id: "py-u5-l1-c9",
              conceptTags: ["dict"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: 'd = {"a": 1, "b": 2, "c": 3}\nprint(len(d))',
              explanation: "len() 은 딕셔너리에 들어있는 키의 개수를 셉니다.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "6", correct: false },
                { id: "c", text: "1", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u5-l1-c10",
              conceptTags: ["dict", "io"],
              type: "WRITE",
              language: "python",
              question:
                "딕셔너리 {'a': 1, 'b': 2, 'c': 3} 이 주어질 때, 입력받은 키가 딕셔너리에 있으면 'True', 없으면 'False' 를 출력하세요.",
              explanation: "in 연산자로 키가 딕셔너리에 있는지 바로 확인할 수 있습니다.",
              starterCode: "d = {'a': 1, 'b': 2, 'c': 3}\nkey = input()\n",
              testCases: [
                { stdin: "a", expected: "True" },
                { stdin: "z", expected: "False" },
                { stdin: "c", expected: "True", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "py-u6",
      order: 6,
      title: "유닛 6 · 예외 처리",
      description: "예외를 처리해 프로그램이 죽지 않게 만들기",
      lessons: [
        {
          id: "py-u6-l1",
          title: "try-except",
          challenges: [
            {
              id: "py-u6-l1-c1",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "python",
              question: "사용자로부터 숫자를 입력받아 정수로 변환하려고 합니다. 사용자가 잘못된 값을 입력할 경우, 오류를 처리하여 '잘못된 입력입니다.'라는 메시지를 출력해야 합니다.\n예시\n입력: abc\n출력: 잘못된 입력입니다.",
              explanation: "이 문제는 사용자가 입력한 문자열을 정수로 변환하려고 시도합니다. 만약 변환이 실패하면 ValueError가 발생하고, 이때 except 블록이 실행되어 오류 메시지를 출력합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "123",
                  expected: "잘못된 입력이 아닙니다."
                },
                {
                  stdin: "abc",
                  expected: "잘못된 입력입니다."
                },
                {
                  stdin: "45.67",
                  expected: "잘못된 입력입니다.",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u6-l1-c2",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "python",
              question: "사용자로부터 두 개의 숫자를 입력받아 첫 번째 숫자를 두 번째 숫자로 나누는 프로그램을 작성하세요. 두 번째 숫자가 0일 경우, '0으로 나눌 수 없습니다.'라는 메시지를 출력해야 합니다.\n예시\n입력: 10\n0\n출력: 0으로 나눌 수 없습니다.",
              explanation: "이 문제는 사용자가 입력한 두 숫자를 나누는 간단한 프로그램을 작성하는 것입니다. 사용자가 0으로 나누려고 할 때 발생하는 ZeroDivisionError를 try-except 블록을 사용하여 처리합니다. 0으로 나누는 경우에는 적절한 오류 메시지를 출력합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "10\n2",
                  expected: "5.0"
                },
                {
                  stdin: "15\n3",
                  expected: "5.0"
                },
                {
                  stdin: "20\n0",
                  expected: "0으로 나눌 수 없습니다.",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u6-l1-c3",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "python",
              question: "사용자로부터 두 개의 숫자를 입력받아 나눗셈을 수행합니다. 나누는 수가 0일 경우 오류를 처리하고, 항상 완료 메시지를 출력해야 합니다.\n예시\n입력: 10\n2\n출력: 5.0\n완료되었습니다.",
              explanation: "이 코드는 사용자가 입력한 두 숫자를 나누고, 0으로 나누는 경우를 처리하기 위해 try-except-finally 블록을 사용합니다. 나누는 수가 0이면 오류 메시지를 출력하고, 마지막에 항상 '완료되었습니다.'라는 메시지를 출력합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "10\n2",
                  expected: "5.0\n완료되었습니다."
                },
                {
                  stdin: "5\n0",
                  expected: "오류: 0으로 나눌 수 없습니다.\n완료되었습니다."
                },
                {
                  stdin: "15\n3",
                  expected: "5.0\n완료되었습니다.",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u6-l1-c4",
              conceptTags: ["exception"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "try:\n    x = int('abc')\nexcept ValueError:\n    print('오류 발생')",
              explanation: "'abc' 는 정수로 변환할 수 없어 ValueError 가 발생하고, except 블록이 실행됩니다.",
              options: [
                { id: "a", text: "오류 발생", correct: true },
                { id: "b", text: "abc", correct: false },
                { id: "c", text: "None", correct: false },
                { id: "d", text: "아무것도 출력되지 않음", correct: false },
              ],
            },
            {
              id: "py-u6-l1-c5",
              conceptTags: ["exception"],
              type: "FILL",
              language: "python",
              question: "예외가 발생했을 때 처리하도록 빈칸을 채우세요.",
              explanation: "예외를 잡아내는 키워드는 except 입니다.",
              fillCode: "try:\n    print(10 / 0)\n{{0}} ZeroDivisionError:\n    print('0으로 나눌 수 없습니다')",
              fillAnswers: [["except"]],
            },
            {
              id: "py-u6-l1-c6",
              conceptTags: ["exception"],
              type: "PARSONS",
              language: "python",
              question:
                "나눗셈을 시도하고, 0으로 나누면 오류 메시지를, 항상 마지막엔 '완료' 를 출력하도록 줄 순서를 맞추세요.",
              explanation: "finally 블록은 예외 발생 여부와 상관없이 항상 실행됩니다.",
              parsonsLines: [
                "try:",
                "    print(10 / 2)",
                "except ZeroDivisionError:",
                "    print('오류')",
                "finally:",
                "    print('완료')",
              ],
            },
            {
              id: "py-u6-l1-c7",
              conceptTags: ["exception", "debug"],
              type: "BUGFIX",
              language: "python",
              question:
                "숫자가 아닌 값을 입력하면 오류 메시지가 나와야 하는데 프로그램이 그냥 멈춰버립니다. 버그를 고치세요.",
              explanation:
                "int() 변환 실패는 TypeError 가 아니라 ValueError 입니다. except 타입을 ValueError 로 바꿔야 합니다.",
              starterCode:
                "try:\n    n = int(input())\n    print(n)\nexcept TypeError:      # ← 버그\n    print('잘못된 입력입니다')\n",
              testCases: [
                { stdin: "5", expected: "5" },
                { stdin: "abc", expected: "잘못된 입력입니다" },
                { stdin: "10", expected: "10", hidden: true },
              ],
            },
            {
              id: "py-u6-l1-c8",
              conceptTags: ["exception", "list", "io"],
              type: "WRITE",
              language: "python",
              question:
                "정수 리스트와 인덱스를 입력받아, 해당 인덱스의 값을 출력하세요. 인덱스가 범위를 벗어나면 '범위를 벗어났습니다' 를 출력하세요.\n예시\n입력: 1 2 3\n5\n출력: 범위를 벗어났습니다",
              explanation:
                "리스트 인덱싱을 try 블록 안에서 시도하고, IndexError 를 except 로 잡아 메시지를 출력합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "1 2 3\n1", expected: "2" },
                { stdin: "1 2 3\n5", expected: "범위를 벗어났습니다" },
                { stdin: "10 20 30\n2", expected: "30", hidden: true },
              ],
            },
            {
              id: "py-u6-l1-c9",
              conceptTags: ["exception"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet:
                "try:\n    print(1 / 0)\nexcept ValueError:\n    print('값 오류')\nexcept ZeroDivisionError:\n    print('0 나눗셈 오류')",
              explanation:
                "1/0 은 ZeroDivisionError 를 발생시킵니다. 첫 except 는 ValueError 라 맞지 않고, 두 번째 except 가 실행됩니다.",
              options: [
                { id: "a", text: "0 나눗셈 오류", correct: true },
                { id: "b", text: "값 오류", correct: false },
                { id: "c", text: "1", correct: false },
                { id: "d", text: "오류가 두 번 출력됨", correct: false },
              ],
            },
            {
              id: "py-u6-l1-c10",
              conceptTags: ["exception", "io"],
              type: "WRITE",
              language: "python",
              question:
                "문자열을 입력받아 정수로 변환한 뒤 2배를 출력하세요. 변환할 수 없으면 '변환 실패' 를 출력하세요.",
              explanation: "int(input()) 을 try 블록에 넣고, ValueError 를 except 로 잡습니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "5", expected: "10" },
                { stdin: "abc", expected: "변환 실패" },
                { stdin: "-3", expected: "-6", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "py-u7",
      order: 7,
      title: "유닛 7 · 재귀 함수",
      description: "함수가 자기 자신을 호출해 문제를 나눠 풀기",
      lessons: [
        {
          id: "py-u7-l1",
          title: "재귀로 풀기",
          challenges: [
            {
              id: "py-u7-l1-c1",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 정수 n의 팩토리얼을 계산하는 재귀 함수를 작성하세요. 팩토리얼은 n!로 표기되며, n! = n × (n-1)! 입니다. 0!은 1로 정의됩니다.\n예시\n입력: 5\n출력: 120",
              explanation: "이 코드는 재귀 함수를 사용하여 팩토리얼을 계산합니다. n이 0일 때 1을 반환하고, 그렇지 않으면 n과 n-1의 팩토리얼을 곱하여 반환합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "1"
                },
                {
                  stdin: "3",
                  expected: "6"
                },
                {
                  stdin: "4",
                  expected: "24",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u7-l1-c2",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 n에 대해 n번째 피보나치 수를 구하는 재귀 함수를 작성하세요. 피보나치 수열은 0번째와 1번째 수가 각각 0과 1이며, 이후의 수는 이전 두 수의 합으로 정의됩니다.\n예시\n입력: 5\n출력: 5",
              explanation: "이 문제는 재귀 함수를 사용하여 피보나치 수를 계산하는 방법을 연습하는 것입니다. 피보나치 수열은 0과 1로 시작하며, 각 수는 이전 두 수의 합으로 정의됩니다. 재귀 함수를 통해 이 정의를 코드로 구현할 수 있습니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "0"
                },
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "10",
                  expected: "55",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u7-l1-c3",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "python",
              question: "재귀 함수를 사용하여 1부터 n까지의 합을 구하는 프로그램을 작성하세요.\n예시\n입력: 5\n출력: 15",
              explanation: "이 코드는 재귀 함수를 사용하여 1부터 n까지의 합을 계산합니다. 기본 사례로 n이 1일 때 1을 반환하고, 그렇지 않으면 n과 n-1까지의 합을 재귀적으로 더합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "10",
                  expected: "55"
                },
                {
                  stdin: "100",
                  expected: "5050",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u7-l1-c4",
              conceptTags: ["recursion"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "def f(n):\n    if n == 0:\n        return 0\n    return n + f(n-1)\n\nprint(f(3))",
              explanation: "f(3) = 3 + f(2) = 3 + 2 + f(1) = 3+2+1+f(0) = 3+2+1+0 = 6.",
              options: [
                { id: "a", text: "6", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "0", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u7-l1-c5",
              conceptTags: ["recursion"],
              type: "FILL",
              language: "python",
              question: "n이 0일 때 1을 반환하도록(팩토리얼의 기저 조건) 빈칸을 채우세요.",
              explanation: "0! 은 1로 정의되므로 기저 조건에서 1을 반환해야 합니다.",
              fillCode: "def factorial(n):\n    if n == 0:\n        return {{0}}\n    return n * factorial(n-1)",
              fillAnswers: [["1"]],
            },
            {
              id: "py-u7-l1-c6",
              conceptTags: ["recursion"],
              type: "PARSONS",
              language: "python",
              question: "n부터 1까지 출력한 뒤 재귀를 멈추도록 줄 순서를 맞추세요.",
              explanation:
                "n이 0이 되면 return 으로 재귀를 멈추고, 그 전엔 출력 후 자기 자신을 n-1로 호출합니다.",
              parsonsLines: [
                "def countdown(n):",
                "    if n == 0:",
                "        return",
                "    print(n)",
                "    countdown(n - 1)",
                "countdown(3)",
              ],
            },
            {
              id: "py-u7-l1-c7",
              conceptTags: ["recursion", "debug"],
              type: "BUGFIX",
              language: "python",
              question:
                "0! 은 1이어야 하는데 기저 조건이 잘못되어 항상 0이 출력됩니다. 버그를 고치세요.",
              explanation:
                "곱셈의 기저 조건은 0이 아니라 1이어야 합니다(0을 곱하면 전체가 0이 되어버립니다).",
              starterCode:
                "def factorial(n):\n    if n == 0:\n        return 0      # ← 버그\n    return n * factorial(n-1)\n\nprint(factorial(4))\n",
              testCases: [{ expected: "24" }],
            },
            {
              id: "py-u7-l1-c8",
              conceptTags: ["recursion", "io"],
              type: "WRITE",
              language: "python",
              question:
                "공백으로 구분된 x와 n을 입력받아, 재귀 함수를 사용해 x의 n제곱을 계산해 출력하세요. (n은 0 이상의 정수)",
              explanation: "기저 조건 n==0 이면 1을 반환하고, 그 외엔 x * power(x, n-1) 을 반환합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "2 5", expected: "32" },
                { stdin: "3 0", expected: "1" },
                { stdin: "5 2", expected: "25", hidden: true },
              ],
            },
            {
              id: "py-u7-l1-c9",
              conceptTags: ["recursion"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "def rec(n):\n    if n <= 1:\n        return 1\n    return rec(n-1) + rec(n-2)\n\nprint(rec(4))",
              explanation: "rec(4) = rec(3)+rec(2) = 3+2 = 5 입니다 (기저 조건: n<=1 이면 1).",
              options: [
                { id: "a", text: "5", correct: true },
                { id: "b", text: "4", correct: false },
                { id: "c", text: "8", correct: false },
                { id: "d", text: "3", correct: false },
              ],
            },
            {
              id: "py-u7-l1-c10",
              conceptTags: ["recursion", "io"],
              type: "WRITE",
              language: "python",
              question:
                "정수를 입력받아 각 자릿수의 합을 재귀 함수로 구해 출력하세요. (음이 아닌 정수만 입력됩니다)",
              explanation:
                "n이 한 자리 수(n < 10)면 n 자신을 반환하고, 그 외엔 n%10 + digit_sum(n//10) 을 반환합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "123", expected: "6" },
                { stdin: "9", expected: "9" },
                { stdin: "1000", expected: "1", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "py-u8",
      order: 8,
      title: "유닛 8 · 클래스 기초",
      description: "데이터와 동작을 객체로 묶어보기",
      lessons: [
        {
          id: "py-u8-l1",
          title: "클래스와 객체",
          challenges: [
            {
              id: "py-u8-l1-c1",
              conceptTags: [
                "oop"
              ],
              type: "WRITE",
              language: "python",
              question: "학생의 이름과 나이를 속성으로 가지는 Student 클래스를 정의하고, 인스턴스를 생성하여 속성을 출력하는 프로그램을 작성하세요.\n예시\n입력: 홍길동\n20\n출력: 이름: 홍길동\n나이: 20",
              explanation: "이 문제는 학생의 이름과 나이를 속성으로 가지는 Student 클래스를 정의하는 것입니다. 인스턴스를 생성한 후, 해당 인스턴스의 속성을 출력하는 방법을 배우게 됩니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "김철수\n25",
                  expected: "이름: 김철수\n나이: 25"
                },
                {
                  stdin: "이영희\n30",
                  expected: "이름: 이영희\n나이: 30"
                },
                {
                  stdin: "박지민\n18",
                  expected: "이름: 박지민\n나이: 18",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u8-l1-c2",
              conceptTags: [
                "oop"
              ],
              type: "WRITE",
              language: "python",
              question: "사각형의 면적을 계산하는 클래스를 작성하세요. 이 클래스는 폭과 높이를 속성으로 가지고 있으며, 면적을 계산하는 메서드를 포함해야 합니다.\n예시\n입력: 5 10\n출력: 50",
              explanation: "이 문제는 클래스와 메서드를 사용하여 사각형의 면적을 계산하는 방법을 배우는 것입니다. 사용자는 폭과 높이를 입력하고, 클래스의 메서드를 통해 면적을 계산하여 출력합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "3 4",
                  expected: "12"
                },
                {
                  stdin: "7 2",
                  expected: "14"
                },
                {
                  stdin: "10 10",
                  expected: "100",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u8-l1-c3",
              conceptTags: [
                "oop"
              ],
              type: "WRITE",
              language: "python",
              question: "학생의 이름과 나이를 저장하는 학생 클래스를 만드세요. 생성자(__init__)를 사용하여 초기값을 설정하고, 학생의 정보를 출력하는 메서드도 추가하세요.\n예시\n입력: 홍길동\n20\n출력: 이름: 홍길동, 나이: 20",
              explanation: "이 문제는 학생 정보를 저장하는 클래스를 만들고, 생성자를 통해 초기값을 설정하는 연습입니다. 학생의 이름과 나이를 입력받아 객체를 생성하고, 해당 정보를 출력하는 메서드를 통해 객체의 속성을 확인할 수 있습니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "김철수\n25",
                  expected: "이름: 김철수, 나이: 25"
                },
                {
                  stdin: "이영희\n30",
                  expected: "이름: 이영희, 나이: 30"
                },
                {
                  stdin: "박지민\n18",
                  expected: "이름: 박지민, 나이: 18",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u8-l1-c4",
              conceptTags: ["oop"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog('바둑이')\nprint(d.name)",
              explanation: "__init__ 에서 self.name 에 저장한 값을 인스턴스 d.name 으로 꺼낼 수 있습니다.",
              options: [
                { id: "a", text: "바둑이", correct: true },
                { id: "b", text: "name", correct: false },
                { id: "c", text: "Dog", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u8-l1-c5",
              conceptTags: ["oop"],
              type: "FILL",
              language: "python",
              question: "생성자에서 인스턴스 속성에 값을 저장하도록 빈칸을 채우세요.",
              explanation: "인스턴스 자신을 가리키는 첫 번째 매개변수는 self 입니다.",
              fillCode: "class Cat:\n    def __init__(self, age):\n        {{0}}.age = age\n\nc = Cat(3)\nprint(c.age)",
              fillAnswers: [["self"]],
            },
            {
              id: "py-u8-l1-c6",
              conceptTags: ["oop"],
              type: "PARSONS",
              language: "python",
              question: "원의 넓이를 계산하는 메서드를 가진 클래스를 만들어 사용하도록 줄 순서를 맞추세요.",
              explanation: "클래스 안에 메서드를 정의하고, 인스턴스를 만든 뒤 메서드를 호출합니다.",
              parsonsLines: [
                "class Circle:",
                "    def __init__(self, r):",
                "        self.r = r",
                "    def area(self):",
                "        return 3.14 * self.r * self.r",
                "c = Circle(2)",
                "print(c.area())",
              ],
            },
            {
              id: "py-u8-l1-c7",
              conceptTags: ["oop", "debug"],
              type: "BUGFIX",
              language: "python",
              question: "메서드에 self 매개변수가 빠져 오류가 납니다. 버그를 고치세요.",
              explanation: "인스턴스 메서드는 첫 번째 매개변수로 반드시 self 를 받아야 합니다.",
              starterCode:
                "class Counter:\n    def __init__(self):\n        self.count = 0\n    def increase():      # ← 버그\n        self.count += 1\n\nc = Counter()\nc.increase()\nprint(c.count)\n",
              testCases: [{ expected: "1" }],
            },
            {
              id: "py-u8-l1-c8",
              conceptTags: ["oop", "io"],
              type: "WRITE",
              language: "python",
              question:
                "잔액(balance)을 속성으로 갖는 Wallet 클래스를 작성하세요. 정수를 입력받아 초기 잔액으로 설정하고, add(금액) 메서드로 금액을 더한 뒤 최종 잔액을 출력하세요.\n예시\n입력: 1000\n500\n출력: 1500",
              explanation: "add 메서드 안에서 self.balance 에 금액을 더하면 됩니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "1000\n500", expected: "1500" },
                { stdin: "0\n100", expected: "100" },
                { stdin: "2000\n-500", expected: "1500", hidden: true },
              ],
            },
            {
              id: "py-u8-l1-c9",
              conceptTags: ["oop"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "class Box:\n    def __init__(self, size):\n        self.size = size\n\na = Box(3)\nb = Box(5)\nprint(a.size, b.size)",
              explanation: "각 인스턴스는 자신만의 size 값을 가집니다. a.size 는 3, b.size 는 5.",
              options: [
                { id: "a", text: "3 5", correct: true },
                { id: "b", text: "5 5", correct: false },
                { id: "c", text: "3 3", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u8-l1-c10",
              conceptTags: ["oop", "io"],
              type: "WRITE",
              language: "python",
              question:
                "가로(width)와 세로(height)를 속성으로 갖는 Rectangle 클래스를 작성하세요. is_square() 메서드는 가로와 세로가 같으면 'True', 다르면 'False' 를 반환합니다. 가로와 세로를 입력받아 결과를 출력하세요.",
              explanation: "is_square 메서드에서 self.width == self.height 를 반환하면 됩니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "4 4", expected: "True" },
                { stdin: "3 5", expected: "False" },
                { stdin: "7 7", expected: "True", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "py-u9",
      order: 9,
      title: "유닛 9 · 정렬과 탐색",
      description: "리스트를 정렬하고 원하는 값을 찾기",
      lessons: [
        {
          id: "py-u9-l1",
          title: "정렬·탐색 기초",
          challenges: [
            {
              id: "py-u9-l1-c1",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 숫자 리스트를 오름차순으로 정렬하여 출력하는 프로그램을 작성하세요.\n예시\n입력: 5\n3 1 4 1 5\n출력: 1 1 3 4 5",
              explanation: "이 문제는 주어진 리스트를 정렬하는 간단한 문제입니다. 파이썬의 내장 함수인 sort()를 사용하여 리스트를 정렬하고, 결과를 출력합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "3\n9 2 5",
                  expected: "2 5 9"
                },
                {
                  stdin: "4\n7 3 3 1",
                  expected: "1 3 3 7"
                },
                {
                  stdin: "6\n10 20 10 30 20 10",
                  expected: "10 10 10 20 20 30",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u9-l1-c2",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 리스트에서 특정 값의 인덱스를 찾아 출력하는 프로그램을 작성하세요. 값이 리스트에 없으면 -1을 출력해야 합니다.\n예시\n입력: 5\n1 2 3 4 5\n3\n출력: 2",
              explanation: "이 프로그램은 리스트의 길이와 리스트의 요소, 찾고자 하는 값을 입력받습니다. 리스트에서 해당 값의 인덱스를 찾아 출력하며, 값이 없을 경우 -1을 출력합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "5\n1 2 3 4 5\n3",
                  expected: "2"
                },
                {
                  stdin: "4\n10 20 30 40\n25",
                  expected: "-1"
                },
                {
                  stdin: "6\n5 10 15 20 25 30\n10",
                  expected: "1",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u9-l1-c3",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 정수 리스트에서 두 번째로 큰 값을 찾아 출력하는 프로그램을 작성하세요.\n예시\n입력: 5\n3 1 4 2 5\n출력: 4",
              explanation: "이 문제는 리스트에서 두 번째로 큰 값을 찾는 문제입니다. 먼저 리스트에서 중복된 값을 제거하고, 정렬한 후 두 번째로 큰 값을 반환합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "3\n10 20 30",
                  expected: "20"
                },
                {
                  stdin: "4\n7 5 9 1",
                  expected: "7"
                },
                {
                  stdin: "6\n15 22 8 42 35 10",
                  expected: "35",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u9-l1-c4",
              conceptTags: ["algorithm", "list"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "nums = [3, 1, 4, 1, 5]\nprint(sorted(nums, reverse=True))",
              explanation: "reverse=True 를 주면 내림차순으로 정렬됩니다.",
              options: [
                { id: "a", text: "[5, 4, 3, 1, 1]", correct: true },
                { id: "b", text: "[1, 1, 3, 4, 5]", correct: false },
                { id: "c", text: "[3, 1, 4, 1, 5]", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u9-l1-c5",
              conceptTags: ["algorithm", "list"],
              type: "FILL",
              language: "python",
              question: "리스트를 내림차순으로 정렬하도록 빈칸을 채우세요.",
              explanation: "sort(reverse=True) 는 리스트를 내림차순으로 정렬합니다.",
              fillCode: "nums = [5, 2, 8, 1]\nnums.sort({{0}}=True)\nprint(nums)",
              fillAnswers: [["reverse"]],
            },
            {
              id: "py-u9-l1-c6",
              conceptTags: ["algorithm", "list"],
              type: "PARSONS",
              language: "python",
              question: "리스트에서 가장 작은 값을 반복문으로 찾아 출력하도록 줄 순서를 맞추세요.",
              explanation: "첫 값을 기준으로 시작해, 더 작은 값을 만날 때마다 갱신합니다.",
              parsonsLines: [
                "nums = [5, 2, 8, 1, 9]",
                "smallest = nums[0]",
                "for n in nums:",
                "    if n < smallest:",
                "        smallest = n",
                "print(smallest)",
              ],
            },
            {
              id: "py-u9-l1-c7",
              conceptTags: ["algorithm", "list", "debug"],
              type: "BUGFIX",
              language: "python",
              question: "정렬된 리스트가 출력되어야 하는데 None 이 출력됩니다. 버그를 고치세요.",
              explanation:
                "리스트의 sort() 는 제자리에서 정렬하고 None 을 반환합니다. nums = nums.sort() 대신 그냥 nums.sort() 라고만 써야 합니다.",
              starterCode: "nums = [3, 1, 2]\nnums = nums.sort()      # ← 버그\nprint(nums)\n",
              testCases: [{ expected: "[1, 2, 3]" }],
            },
            {
              id: "py-u9-l1-c8",
              conceptTags: ["algorithm", "list", "io"],
              type: "WRITE",
              language: "python",
              question:
                "공백으로 구분된 정수 여러 개와 찾을 값을 입력받아(마지막 줄에 찾을 값), 그 값이 리스트에 몇 번 나오는지 출력하세요.\n예시\n입력: 1 2 2 3 2\n2\n출력: 3",
              explanation: "리스트를 순회하며 찾을 값과 같은 원소의 개수를 셉니다(count() 도 가능).",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "1 2 2 3 2\n2", expected: "3" },
                { stdin: "5 5 5\n5", expected: "3" },
                { stdin: "1 2 3\n9", expected: "0", hidden: true },
              ],
            },
            {
              id: "py-u9-l1-c9",
              conceptTags: ["algorithm", "list"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet: "nums = [4, 9, 2, 7]\nprint(min(nums), max(nums))",
              explanation: "min() 은 가장 작은 값(2), max() 는 가장 큰 값(9)을 반환합니다.",
              options: [
                { id: "a", text: "2 9", correct: true },
                { id: "b", text: "9 2", correct: false },
                { id: "c", text: "4 7", correct: false },
                { id: "d", text: "2 7", correct: false },
              ],
            },
            {
              id: "py-u9-l1-c10",
              conceptTags: ["algorithm", "list", "io"],
              type: "WRITE",
              language: "python",
              question:
                "공백으로 구분된 정수 여러 개를 입력받아, 최댓값과 최솟값의 차이(범위)를 출력하세요.",
              explanation: "max(nums) - min(nums) 를 계산하면 됩니다.",
              starterCode: "nums = list(map(int, input().split()))\n",
              testCases: [
                { stdin: "1 5 3 9 2", expected: "8" },
                { stdin: "10 10 10", expected: "0" },
                { stdin: "-3 4 0", expected: "7", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "py-u10",
      order: 10,
      title: "유닛 10 · 종합 응용",
      description: "배운 개념을 조합해 풀어보는 응용 문제",
      lessons: [
        {
          id: "py-u10-l1",
          title: "종합 문제",
          challenges: [
            {
              id: "py-u10-l1-c1",
              conceptTags: [
                "dict",
                "string"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 문자열에서 각 단어의 빈도수를 세고, 그 결과를 딕셔너리 형태로 반환하는 프로그램을 작성하세요.\n예시\n입력: hello world hello\n출력: {'hello': 2, 'world': 1}",
              explanation: "이 문제는 주어진 문자열을 공백으로 나누어 각 단어의 빈도수를 세는 과정입니다. 문자열을 split() 메서드를 사용하여 단어 리스트로 만든 후, 반복문을 통해 딕셔너리에 각 단어의 빈도수를 저장합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "apple banana apple orange",
                  expected: "{'apple': 2, 'banana': 1, 'orange': 1}"
                },
                {
                  stdin: "dog cat dog cat dog",
                  expected: "{'dog': 3, 'cat': 2}"
                },
                {
                  stdin: "python java python python",
                  expected: "{'python': 3, 'java': 1}",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u10-l1-c2",
              conceptTags: [
                "function",
                "list"
              ],
              type: "WRITE",
              language: "python",
              question: "주어진 정수 리스트에서 중복된 값을 제거하고, 중복이 제거된 리스트를 반환하는 함수를 작성하세요. 반환된 리스트는 오름차순으로 정렬되어야 합니다.\n예시\n입력: 5\n3 1 2 2 3\n출력: 1 2 3",
              explanation: "이 문제는 리스트에서 중복된 값을 제거하고 정렬하는 과정을 연습할 수 있는 문제입니다. set() 함수를 사용하여 중복을 제거하고, sort() 메서드를 사용하여 리스트를 정렬합니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "5\n3 1 2 2 3",
                  expected: "1 2 3"
                },
                {
                  stdin: "6\n5 5 5 5 5 5",
                  expected: "5"
                },
                {
                  stdin: "4\n4 3 2 1",
                  expected: "1 2 3 4",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u10-l1-c3",
              conceptTags: [
                "loop",
                "condition"
              ],
              type: "WRITE",
              language: "python",
              question: "사용자로부터 정수를 입력받아, 1부터 그 정수까지의 모든 짝수의 합을 계산하는 프로그램을 작성하세요.\n예시\n입력: 10\n출력: 30",
              explanation: "이 문제는 반복문과 조건문을 사용하여 1부터 N까지의 정수를 순회하면서 짝수인 경우에만 합계를 계산하는 간단한 문제입니다.",
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "10",
                  expected: "30"
                },
                {
                  stdin: "20",
                  expected: "110"
                },
                {
                  stdin: "5",
                  expected: "6",
                  hidden: true
                }
              ]
            },
            {
              id: "py-u10-l1-c4",
              conceptTags: ["string", "loop"],
              type: "SELECT",
              language: "python",
              question: "다음 코드가 출력하는 줄의 개수는?",
              codeSnippet: "words = ['a', 'bb', 'ccc']\nfor w in words:\n    if len(w) > 1:\n        print(w)",
              explanation: "길이가 1보다 큰 단어는 'bb', 'ccc' 두 개입니다.",
              options: [
                { id: "a", text: "2", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "1", correct: false },
                { id: "d", text: "0", correct: false },
              ],
            },
            {
              id: "py-u10-l1-c5",
              conceptTags: ["list", "condition"],
              type: "FILL",
              language: "python",
              question: "리스트에서 0보다 큰 값의 개수를 세도록 빈칸을 채우세요.",
              explanation: "0보다 큰 값만 세려면 > 연산자를 사용합니다.",
              fillCode: "nums = [-2, 5, 0, 3, -1]\ncount = 0\nfor n in nums:\n    if n {{0}} 0:\n        count += 1\nprint(count)",
              fillAnswers: [[">"]],
            },
            {
              id: "py-u10-l1-c6",
              conceptTags: ["function", "loop"],
              type: "PARSONS",
              language: "python",
              question: "1부터 n까지 제곱의 합을 구하는 함수를 만들어 호출하도록 줄 순서를 맞추세요.",
              explanation: "1²+2²+3² = 1+4+9 = 14 를 반환합니다.",
              parsonsLines: [
                "def sum_of_squares(n):",
                "    total = 0",
                "    for i in range(1, n + 1):",
                "        total += i * i",
                "    return total",
                "print(sum_of_squares(3))",
              ],
            },
            {
              id: "py-u10-l1-c7",
              conceptTags: ["dict", "loop", "debug"],
              type: "BUGFIX",
              language: "python",
              question: "글자별 개수를 세려는데 KeyError 가 납니다. 버그를 고치세요.",
              explanation:
                "처음 나온 글자는 딕셔너리에 키가 없어 오류가 납니다. counts.get(ch, 0) + 1 로 기본값을 줘야 합니다.",
              starterCode: "s = 'banana'\ncounts = {}\nfor ch in s:\n    counts[ch] += 1      # ← 버그\nprint(counts)\n",
              testCases: [{ expected: "{'b': 1, 'a': 3, 'n': 2}" }],
            },
            {
              id: "py-u10-l1-c8",
              conceptTags: ["string", "condition", "io"],
              type: "WRITE",
              language: "python",
              question:
                "문자열을 입력받아 앞뒤가 같으면(팰린드롬이면) 'True', 아니면 'False' 를 출력하세요.",
              explanation: "s == s[::-1] 로 원본과 뒤집은 문자열이 같은지 비교합니다.",
              starterCode: "s = input()\n",
              testCases: [
                { stdin: "level", expected: "True" },
                { stdin: "hello", expected: "False" },
                { stdin: "a", expected: "True", hidden: true },
              ],
            },
            {
              id: "py-u10-l1-c9",
              conceptTags: ["exception", "loop"],
              type: "SELECT",
              language: "python",
              question: "다음 코드의 출력은?",
              codeSnippet:
                "nums = ['1', 'two', '3']\ntotal = 0\nfor n in nums:\n    try:\n        total += int(n)\n    except ValueError:\n        pass\nprint(total)",
              explanation:
                "'two' 는 정수로 변환할 수 없어 예외가 발생하지만 except 에서 무시되고, '1'과 '3'만 더해져 4가 됩니다.",
              options: [
                { id: "a", text: "4", correct: true },
                { id: "b", text: "1", correct: false },
                { id: "c", text: "3", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "py-u10-l1-c10",
              conceptTags: ["loop", "condition", "io"],
              type: "WRITE",
              language: "python",
              question:
                "정수 n을 입력받아 1부터 n까지, 3의 배수면 'Fizz', 5의 배수면 'Buzz', 둘 다면 'FizzBuzz', 그 외엔 숫자 자체를 한 줄씩 출력하세요.",
              explanation:
                "3과 5 모두의 배수인지(15의 배수) 먼저 확인한 뒤, 3의 배수, 5의 배수, 그 외 순서로 검사합니다.",
              starterCode: "n = int(input())\n",
              testCases: [
                { stdin: "5", expected: "1\n2\nFizz\n4\nBuzz" },
                { stdin: "3", expected: "1\n2\nFizz" },
                {
                  stdin: "15",
                  expected:
                    "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
                  hidden: true,
                },
              ],
            },
          ]
        }
      ]
    },
  ],
};

export const c: Course = {
  id: "c",
  title: "C 시스템",
  emoji: "⚙️",
  description: "포인터·메모리까지, 실행 없이는 못 배우는 것들",
  units: [
    {
      id: "c-u1",
      order: 1,
      title: "유닛 1 · C 기초",
      description: "printf, 자료형, 그리고 포인터 맛보기",
      lessons: [
        {
          id: "c-u1-l1",
          title: "printf와 자료형",
          challenges: [
            {
              id: "c-u1-l1-c1",
              conceptTags: ["output", "operator"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'printf("%d\\n", 3 + 4);',
              explanation: "%d 자리에 3+4의 계산 결과 7이 들어갑니다.",
              options: [
                { id: "a", text: "7", correct: true },
                { id: "b", text: "3 + 4", correct: false },
                { id: "c", text: "34", correct: false },
                { id: "d", text: "%d", correct: false },
              ],
            },
            {
              id: "c-u1-l1-c2",
              conceptTags: ["output", "variable"],
              type: "FILL",
              language: "c",
              question: "정수 n을 출력하도록 형식 지정자를 넣으세요.",
              explanation:
                "정수 출력에는 %d 를 씁니다. %i 도 정수를 출력하므로 함께 정답으로 인정됩니다.",
              fillCode: 'int n = 42;\nprintf("{{0}}\\n", n);',
              fillAnswers: [["%d", "%i"]],
            },
            {
              id: "c-u1-l1-c3",
              conceptTags: ["operator", "variable"],
              type: "SELECT",
              language: "c",
              question: "C의 정수 나눗셈입니다. 출력은?",
              codeSnippet: 'printf("%d\\n", 7 / 2);',
              explanation:
                "정수끼리 나누면 소수점 아래는 버립니다. 7 / 2 = 3.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "3.5", correct: false },
                { id: "c", text: "4", correct: false },
                { id: "d", text: "2", correct: false },
              ],
            },
            {
              id: "c-u1-l1-c4",
              conceptTags: ["output", "variable"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'float f = 3.5;\nprintf("%.1f\\n", f);',
              explanation: "%f 는 실수를 출력하는 형식 지정자입니다. %.1f 는 소수점 첫째 자리까지 출력합니다.",
              options: [
                { id: "a", text: "3.5", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "3.500000", correct: false },
                { id: "d", text: "%f", correct: false },
              ],
            },
            {
              id: "c-u1-l1-c5",
              conceptTags: ["output", "variable"],
              type: "FILL",
              language: "c",
              question: "문자 'A'를 출력하도록 형식 지정자를 채우세요.",
              explanation: "문자를 출력할 때는 %c 를 사용합니다.",
              fillCode: "char c = 'A';\nprintf(\"{{0}}\\n\", c);",
              fillAnswers: [["%c"]],
            },
            {
              id: "c-u1-l1-c6",
              conceptTags: ["output", "variable"],
              type: "PARSONS",
              language: "c",
              question: "정수 변수를 선언하고 값을 출력하는 완전한 프로그램이 되도록 순서를 맞추세요.",
              explanation: "변수를 선언하고 초기화한 뒤 printf 로 출력합니다.",
              parsonsLines: [
                "#include <stdio.h>",
                "int main(void) {",
                "    int age = 20;",
                '    printf("%d\\n", age);',
                "    return 0;",
                "}",
              ],
            },
            {
              id: "c-u1-l1-c7",
              conceptTags: ["output", "variable", "debug"],
              type: "BUGFIX",
              language: "c",
              question: "실수를 출력해야 하는데 자료형이 맞지 않아 이상한 값이 나옵니다. 버그를 고치세요.",
              explanation:
                "실수는 %d 가 아니라 %f 계열로 출력해야 합니다. %.2f 로 고치면 소수점 둘째 자리까지 정확히 출력됩니다.",
              starterCode: 'float pi = 3.14;\nprintf("%d\\n", pi);      // ← 버그\n',
              testCases: [{ expected: "3.14" }],
            },
            {
              id: "c-u1-l1-c8",
              conceptTags: ["variable", "operator", "io"],
              type: "WRITE",
              language: "c",
              question: "정수 두 개를 입력받아, 그 합과 곱을 한 줄에 공백으로 구분해 출력하세요.\n예시\n입력: 3 4\n출력: 7 12",
              explanation: 'scanf("%d %d", &a, &b) 로 두 수를 읽고, printf("%d %d\\n", a+b, a*b) 로 출력합니다.',
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "3 4", expected: "7 12" },
                { stdin: "5 5", expected: "10 25" },
                { stdin: "0 6", expected: "6 0", hidden: true },
              ],
            },
            {
              id: "c-u1-l1-c9",
              conceptTags: ["operator", "variable"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'int a = 5;\ndouble b = 2.0;\nprintf("%.1f\\n", a / b);',
              explanation: "정수를 double 로 나누면 실수 나눗셈이 되어 5 / 2.0 = 2.5 입니다.",
              options: [
                { id: "a", text: "2.5", correct: true },
                { id: "b", text: "2.0", correct: false },
                { id: "c", text: "2", correct: false },
                { id: "d", text: "2.500000", correct: false },
              ],
            },
            {
              id: "c-u1-l1-c10",
              conceptTags: ["variable", "io"],
              type: "WRITE",
              language: "c",
              question: "실수를 하나 입력받아 소수점 둘째 자리까지 반올림하여 출력하세요.\n예시\n입력: 3.14159\n출력: 3.14",
              explanation: 'scanf("%f", &x) 로 읽고 printf("%.2f\\n", x) 로 출력하면 됩니다.',
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "3.14159", expected: "3.14" },
                { stdin: "1.5", expected: "1.50" },
                { stdin: "9.999", expected: "10.00", hidden: true },
              ],
            },
          ],
        },
        {
          id: "c-u1-l2",
          title: "포인터 첫걸음",
          challenges: [
            {
              id: "c-u1-l2-c1",
              conceptTags: ["pointer"],
              type: "SELECT",
              language: "c",
              question: "출력은?",
              codeSnippet: 'int x = 10;\nint *p = &x;\nprintf("%d\\n", *p);',
              explanation:
                "p는 x의 주소를 가리키고, *p 는 그 주소가 담은 값(10)입니다.",
              options: [
                { id: "a", text: "10", correct: true },
                { id: "b", text: "x의 주소값", correct: false },
                { id: "c", text: "0", correct: false },
                { id: "d", text: "&x", correct: false },
              ],
            },
            {
              id: "c-u1-l2-c2",
              conceptTags: ["output"],
              type: "PARSONS",
              language: "c",
              question: "Hi 를 출력하는 완전한 C 프로그램이 되도록 순서를 맞추세요.",
              explanation:
                "헤더 포함 → main 시작 → 출력 → 반환 → 닫기 순서입니다.",
              parsonsLines: [
                "#include <stdio.h>",
                "int main(void) {",
                '    printf("Hi\\n");',
                "    return 0;",
                "}",
              ],
            },
            {
              id: "c-u1-l2-c3",
              conceptTags: ["memory"],
              type: "SELECT",
              language: "c",
              question: "malloc 으로 할당한 메모리를 해제하는 함수는?",
              explanation:
                "C에서는 malloc/calloc 으로 얻은 메모리를 free() 로 돌려줘야 누수가 없습니다.",
              options: [
                { id: "a", text: "free()", correct: true, code: true },
                { id: "b", text: "delete", correct: false, code: true },
                { id: "c", text: "clear()", correct: false, code: true },
                { id: "d", text: "remove()", correct: false, code: true },
              ],
            },
            {
              id: "c-u1-l2-c4",
              conceptTags: ["pointer"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'int x = 5;\nint *p = &x;\n*p = 10;\nprintf("%d\\n", x);',
              explanation: "*p = 10 은 p가 가리키는 곳(x)의 값을 10으로 바꿉니다. 따라서 x도 10이 됩니다.",
              options: [
                { id: "a", text: "10", correct: true },
                { id: "b", text: "5", correct: false },
                { id: "c", text: "주소값", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u1-l2-c5",
              conceptTags: ["pointer"],
              type: "FILL",
              language: "c",
              question: "변수 x의 주소를 포인터 p에 저장하도록 빈칸을 채우세요.",
              explanation: "주소를 얻는 연산자는 & 입니다.",
              fillCode: 'int x = 7;\nint *p = {{0}}x;\nprintf("%d\\n", *p);',
              fillAnswers: [["&"]],
            },
            {
              id: "c-u1-l2-c6",
              conceptTags: ["pointer"],
              type: "PARSONS",
              language: "c",
              question: "포인터로 변수 두 개의 값을 각각 출력하는 프로그램이 되도록 순서를 맞추세요.",
              explanation: "각 변수의 주소를 포인터에 저장한 뒤 * 로 값을 꺼냅니다.",
              parsonsLines: [
                "#include <stdio.h>",
                "int main(void) {",
                "    int a = 1, b = 2;",
                "    int *pa = &a;",
                "    int *pb = &b;",
                '    printf("%d %d\\n", *pa, *pb);',
                "    return 0;",
                "}",
              ],
            },
            {
              id: "c-u1-l2-c7",
              conceptTags: ["pointer", "debug"],
              type: "BUGFIX",
              language: "c",
              question: "포인터가 가리키는 값이 아니라 주소 그 자체가 출력되고 있습니다. 버그를 고치세요.",
              explanation: "p 는 주소, *p 는 그 주소가 가리키는 값입니다. 값을 출력하려면 *p 를 써야 합니다.",
              starterCode: 'int x = 42;\nint *p = &x;\nprintf("%d\\n", p);      // ← 버그\n',
              testCases: [{ expected: "42" }],
            },
            {
              id: "c-u1-l2-c8",
              conceptTags: ["pointer", "io"],
              type: "WRITE",
              language: "c",
              question: "정수를 입력받아, 포인터를 이용해 그 값을 2배로 바꾼 뒤 출력하세요.\n예시\n입력: 5\n출력: 10",
              explanation: "포인터로 변수의 주소를 가리킨 뒤 *p = *p * 2; 로 값을 바꿉니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "5", expected: "10" },
                { stdin: "10", expected: "20" },
                { stdin: "0", expected: "0", hidden: true },
              ],
            },
            {
              id: "c-u1-l2-c9",
              conceptTags: ["pointer", "condition"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'int *p = NULL;\nif (p == NULL) {\n    printf("포인터가 비어있음\\n");\n}',
              explanation: "p 를 NULL 로 초기화했으므로 조건이 참이 되어 메시지가 출력됩니다.",
              options: [
                { id: "a", text: "포인터가 비어있음", correct: true },
                { id: "b", text: "0", correct: false },
                { id: "c", text: "아무것도 출력 안 됨", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u1-l2-c10",
              conceptTags: ["pointer", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수 두 개를 입력받아, 포인터와 임시 변수를 사용해 두 값을 맞바꾼 뒤 출력하세요.\n예시\n입력: 3 7\n출력: 7 3",
              explanation: "포인터가 가리키는 두 값을 temp 변수를 거쳐 서로 바꿉니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "3 7", expected: "7 3" },
                { stdin: "1 1", expected: "1 1" },
                { stdin: "-2 5", expected: "5 -2", hidden: true },
              ],
            },
          ],
        },
        {
          id: "c-u1-l3",
          title: "직접 실행하기",
          challenges: [
            {
              id: "c-u1-l3-c1",
              conceptTags: ["output", "io"],
              type: "WRITE",
              language: "c",
              question:
                "두 정수를 입력받아(공백으로 구분) 그 합을 출력하는 프로그램을 작성하세요.",
              explanation:
                'scanf("%d %d", &a, &b) 로 두 수를 읽고, printf("%d\\n", a + b) 로 출력하면 됩니다.',
              starterCode:
                "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "3 5", expected: "8" },
                { stdin: "10 20", expected: "30" },
                { stdin: "-4 4", expected: "0", hidden: true },
              ],
            },
            {
              id: "c-u1-l3-c2",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "c",
              question:
                "1부터 n까지의 합을 출력해야 하는데 결과가 이상합니다. 버그를 고치세요.",
              explanation:
                "반복문의 조건이 i < n 이면 n 자신이 더해지지 않습니다. i <= n 이어야 합니다.",
              starterCode:
                "#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    int sum = 0;\n    for (int i = 1; i < n; i++) {  // ← 버그\n        sum += i;\n    }\n    printf(\"%d\\n\", sum);\n    return 0;\n}\n",
              testCases: [
                { stdin: "5", expected: "15" },
                { stdin: "10", expected: "55" },
                { stdin: "1", expected: "1", hidden: true },
              ],
            },
            {
              id: "c-u1-l3-c3",
              conceptTags: ["operator", "io"],
              type: "WRITE",
              language: "c",
              question: "정수를 입력받아 그 제곱(자기 자신을 곱한 값)을 출력하세요.\n예시\n입력: 4\n출력: 16",
              explanation: "scanf 로 읽은 정수 n에 대해 n * n 을 출력하면 됩니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "4", expected: "16" },
                { stdin: "7", expected: "49" },
                { stdin: "0", expected: "0", hidden: true },
              ],
            },
            {
              id: "c-u1-l3-c4",
              conceptTags: ["condition", "io"],
              type: "WRITE",
              language: "c",
              question: "정수 두 개를 입력받아 더 큰 값을 출력하세요.\n예시\n입력: 3 8\n출력: 8",
              explanation: "if 문으로 두 값을 비교해 더 큰 쪽을 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "3 8", expected: "8" },
                { stdin: "10 2", expected: "10" },
                { stdin: "5 5", expected: "5", hidden: true },
              ],
            },
            {
              id: "c-u1-l3-c5",
              conceptTags: ["operator", "debug"],
              type: "BUGFIX",
              language: "c",
              question: "두 수의 곱을 출력해야 하는데 합이 출력됩니다. 버그를 고치세요.",
              explanation: "곱셈은 + 가 아니라 * 연산자를 사용해야 합니다.",
              starterCode:
                '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", a + b);      // ← 버그\n    return 0;\n}\n',
              testCases: [{ stdin: "3 4", expected: "12" }],
            },
            {
              id: "c-u1-l3-c6",
              conceptTags: ["operator", "io"],
              type: "WRITE",
              language: "c",
              question: "정수 세 개를 입력받아 그 합을 출력하세요.\n예시\n입력: 1 2 3\n출력: 6",
              explanation: 'scanf("%d %d %d", &a, &b, &c) 로 세 값을 읽어 더합니다.',
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "1 2 3", expected: "6" },
                { stdin: "10 20 30", expected: "60" },
                { stdin: "-5 5 0", expected: "0", hidden: true },
              ],
            },
            {
              id: "c-u1-l3-c7",
              conceptTags: ["io"],
              type: "SELECT",
              language: "c",
              question: "사용자가 25를 입력하면 출력은?",
              codeSnippet: 'int n;\nscanf("%d", &n);\nprintf("%d\\n", n);',
              explanation: "scanf 로 읽은 값을 그대로 출력하므로 입력한 값과 같습니다.",
              options: [
                { id: "a", text: "25", correct: true },
                { id: "b", text: "n", correct: false },
                { id: "c", text: "오류가 납니다", correct: false },
                { id: "d", text: "0", correct: false },
              ],
            },
            {
              id: "c-u1-l3-c8",
              conceptTags: ["io", "variable"],
              type: "FILL",
              language: "c",
              question: "실수를 입력받도록 형식 지정자를 채우세요.",
              explanation: "실수(float)를 입력받을 때는 %f 를 사용합니다.",
              fillCode: 'float x;\nscanf("{{0}}", &x);',
              fillAnswers: [["%f"]],
            },
            {
              id: "c-u1-l3-c9",
              conceptTags: ["io", "operator"],
              type: "PARSONS",
              language: "c",
              question: "두 정수를 입력받아 합을 출력하는 프로그램이 되도록 순서를 맞추세요.",
              explanation: "입력을 받은 뒤 계산하고 출력하는 순서로 작성합니다.",
              parsonsLines: [
                "#include <stdio.h>",
                "int main(void) {",
                "    int a, b;",
                '    scanf("%d %d", &a, &b);',
                '    printf("%d\\n", a + b);',
                "    return 0;",
                "}",
              ],
            },
            {
              id: "c-u1-l3-c10",
              conceptTags: ["condition", "io"],
              type: "WRITE",
              language: "c",
              question: "정수를 입력받아 짝수면 'Even', 홀수면 'Odd' 를 출력하세요.\n예시\n입력: 4\n출력: Even",
              explanation: "n % 2 == 0 이면 짝수입니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "4", expected: "Even" },
                { stdin: "7", expected: "Odd" },
                { stdin: "0", expected: "Even", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c-u2",
      order: 2,
      title: "유닛 2 · 배열과 반복",
      description: "여러 값을 배열에 담고, 중첩 반복문으로 다루기",
      lessons: [
        {
          id: "c-u2-l1",
          title: "배열 기초",
          challenges: [
            {
              id: "c-u2-l1-c1",
              conceptTags: ["list"],
              type: "SELECT",
              language: "c",
              question: "출력은?",
              codeSnippet: 'int arr[4] = {1, 2, 3, 4};\nprintf("%d\\n", arr[3]);',
              explanation: "배열 인덱스는 0부터 시작하므로 arr[3]은 네 번째 값인 4입니다.",
              options: [
                { id: "a", text: "4", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "1", correct: false },
                { id: "d", text: "쓰레기 값", correct: false },
              ],
            },
            {
              id: "c-u2-l1-c2",
              conceptTags: ["list"],
              type: "FILL",
              language: "c",
              question: "배열의 세 번째 원소(인덱스 2)를 출력하도록 빈칸을 채우세요.",
              explanation: "인덱스는 0부터 시작하므로 세 번째 원소는 인덱스 2입니다.",
              fillCode: 'int arr[3] = {10, 20, 30};\nprintf("%d\\n", arr[{{0}}]);',
              fillAnswers: [["2"]],
            },
            {
              id: "c-u2-l1-c3",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수 5개를 입력받아(공백으로 구분) 배열에 저장한 뒤, 그 총합을 출력하는 프로그램을 작성하세요.",
              explanation:
                "for 문으로 scanf 를 5번 반복해 배열을 채우고, 더한 값을 printf 로 출력하면 됩니다.",
              starterCode:
                "#include <stdio.h>\n\nint main(void) {\n    int arr[5];\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "1 2 3 4 5", expected: "15" },
                { stdin: "10 20 30 40 50", expected: "150" },
                { stdin: "0 0 0 0 0", expected: "0", hidden: true },
              ],
            },
            {
              id: "c-u2-l1-c4",
              conceptTags: ["list"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'int arr[5] = {1, 2};\nprintf("%d\\n", arr[4]);',
              explanation: "배열을 일부만 초기화하면 나머지는 0으로 채워집니다.",
              options: [
                { id: "a", text: "0", correct: true },
                { id: "b", text: "2", correct: false },
                { id: "c", text: "쓰레기 값", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u2-l1-c5",
              conceptTags: ["list"],
              type: "FILL",
              language: "c",
              question: "정수 5개를 담을 수 있도록 배열 크기를 채우세요.",
              explanation: "대괄호 안의 숫자가 배열이 담을 수 있는 원소의 개수입니다.",
              fillCode: "int arr[{{0}}];\n",
              fillAnswers: [["5"]],
            },
            {
              id: "c-u2-l1-c6",
              conceptTags: ["list", "loop"],
              type: "PARSONS",
              language: "c",
              question: "배열의 모든 원소를 더해 합계를 출력하도록 순서를 맞추세요.",
              explanation: "반복문으로 배열을 순회하며 각 원소를 sum 에 더합니다.",
              parsonsLines: [
                "int arr[3] = {10, 20, 30};",
                "int sum = 0;",
                "for (int i = 0; i < 3; i++) {",
                "    sum += arr[i];",
                "}",
                'printf("%d\\n", sum);',
              ],
            },
            {
              id: "c-u2-l1-c7",
              conceptTags: ["list", "debug"],
              type: "BUGFIX",
              language: "c",
              question: "배열의 합을 구하는데 범위를 벗어난 접근으로 결과가 이상합니다. 버그를 고치세요.",
              explanation: "배열 크기가 3이면 인덱스는 0~2까지만 유효합니다. i < 3 이어야 합니다.",
              starterCode:
                'int arr[3] = {1, 2, 3};\nint sum = 0;\nfor (int i = 0; i <= 3; i++) {  // ← 버그\n    sum += arr[i];\n}\nprintf("%d\\n", sum);\n',
              testCases: [{ expected: "6" }],
            },
            {
              id: "c-u2-l1-c8",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수 5개를 입력받아 배열에 저장한 뒤, 그 중 최댓값을 출력하세요.\n예시\n입력: 3 7 2 9 4\n출력: 9",
              explanation: "배열을 순회하며 지금까지의 최댓값과 비교해 갱신합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    int arr[5];\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "3 7 2 9 4", expected: "9" },
                { stdin: "10 20 5 1 8", expected: "20" },
                { stdin: "1 1 1 1 1", expected: "1", hidden: true },
              ],
            },
            {
              id: "c-u2-l1-c9",
              conceptTags: ["list"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은? (배열의 원소 개수를 구하는 흔한 방법입니다)",
              codeSnippet: 'int arr[5] = {1, 2, 3, 4, 5};\nprintf("%lu\\n", sizeof(arr) / sizeof(arr[0]));',
              explanation:
                "sizeof(arr) 은 배열 전체 크기, sizeof(arr[0]) 은 원소 하나의 크기이므로, 나누면 원소 개수인 5가 나옵니다.",
              options: [
                { id: "a", text: "5", correct: true },
                { id: "b", text: "20", correct: false },
                { id: "c", text: "4", correct: false },
                { id: "d", text: "1", correct: false },
              ],
            },
            {
              id: "c-u2-l1-c10",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수 5개를 입력받아 배열에 저장한 뒤, 역순으로 한 줄에 하나씩 출력하세요.\n예시\n입력: 1 2 3 4 5\n출력: 5\n4\n3\n2\n1",
              explanation: "인덱스를 마지막(4)부터 0까지 거꾸로 돌며 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    int arr[5];\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "1 2 3 4 5", expected: "5\n4\n3\n2\n1" },
                { stdin: "10 20 30 40 50", expected: "50\n40\n30\n20\n10" },
                { stdin: "0 0 0 0 1", expected: "1\n0\n0\n0\n0", hidden: true },
              ],
            },
          ],
        },
        {
          id: "c-u2-l2",
          title: "중첩 반복문",
          challenges: [
            {
              id: "c-u2-l2-c1",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "c",
              question: "다음 코드는 총 몇 번 출력되나요?",
              codeSnippet:
                'for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 2; j++) {\n        printf("%d\\n", i * j);\n    }\n}',
              explanation: "바깥 반복 3번 × 안쪽 반복 2번 = 6번 출력됩니다.",
              options: [
                { id: "a", text: "6", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "2", correct: false },
                { id: "d", text: "5", correct: false },
              ],
            },
            {
              id: "c-u2-l2-c2",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "c",
              question:
                "구구단처럼 n단을 1부터 n까지 출력해야 하는데, 마지막 줄(n x n)이 빠집니다. 버그를 고치세요.",
              explanation: "반복 조건이 i < n 이면 n 자신이 빠집니다. i <= n 이어야 합니다.",
              starterCode:
                '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    for (int i = 1; i < n; i++) {  // ← 버그\n        printf("%d x %d = %d\\n", n, i, n * i);\n    }\n    return 0;\n}\n',
              testCases: [{ stdin: "3", expected: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9" }],
            },
            {
              id: "c-u2-l2-c3",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수 n을 입력받아, '*' 로 이루어진 n × n 정사각형을 출력하세요 (한 줄에 n개씩, n줄).",
              explanation: "바깥 반복문으로 줄 수를, 안쪽 반복문으로 한 줄에 찍을 개수를 제어합니다.",
              starterCode:
                '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n',
              testCases: [
                { stdin: "3", expected: "***\n***\n***" },
                { stdin: "1", expected: "*" },
                { stdin: "2", expected: "**\n**", hidden: true },
              ],
            },
            {
              id: "c-u2-l2-c4",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "c",
              question: "다음 코드는 총 몇 번 출력되나요?",
              codeSnippet: 'for (int i = 0; i < 2; i++) {\n    for (int j = 0; j < 3; j++) {\n        printf("%d %d\\n", i, j);\n    }\n}',
              explanation: "바깥 반복 2번 × 안쪽 반복 3번 = 6번 출력됩니다.",
              options: [
                { id: "a", text: "6", correct: true },
                { id: "b", text: "5", correct: false },
                { id: "c", text: "2", correct: false },
                { id: "d", text: "3", correct: false },
              ],
            },
            {
              id: "c-u2-l2-c5",
              conceptTags: ["loop"],
              type: "FILL",
              language: "c",
              question: "안쪽 반복문이 각 줄마다 3번씩 돌도록 빈칸을 채우세요.",
              explanation: "조건 j < 3 은 j가 0,1,2 일 때 3번 반복합니다.",
              fillCode: 'for (int i = 0; i < 2; i++) {\n    for (int j = 0; j < {{0}}; j++) {\n        printf("%d %d\\n", i, j);\n    }\n}',
              fillAnswers: [["3"]],
            },
            {
              id: "c-u2-l2-c6",
              conceptTags: ["loop"],
              type: "PARSONS",
              language: "c",
              question: "3단을 1부터 9까지 출력하도록(3 x 1 = 3 형태) 순서를 맞추세요.",
              explanation: "n을 고정하고 i를 1부터 9까지 돌리며 곱을 출력합니다.",
              parsonsLines: [
                "int n = 3;",
                "for (int i = 1; i <= 9; i++) {",
                '    printf("%d x %d = %d\\n", n, i, n * i);',
                "}",
              ],
            },
            {
              id: "c-u2-l2-c7",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "c",
              question:
                "1층엔 별 1개, 2층엔 2개, 3층엔 3개로 늘어나야 하는데 항상 3개씩 출력됩니다. 버그를 고치세요.",
              explanation:
                "안쪽 반복은 고정된 n번이 아니라 그 줄 번호인 i번만큼 돌아야 합니다. j < i 로 고칩니다.",
              starterCode:
                'int n = 3;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 0; j < n; j++) {  // ← 버그\n        printf("*");\n    }\n    printf("\\n");\n}\n',
              testCases: [{ expected: "*\n**\n***" }],
            },
            {
              id: "c-u2-l2-c8",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수 n을 입력받아, 1층엔 별 1개, 2층엔 별 2개, ..., n층엔 별 n개인 계단 모양을 출력하세요.",
              explanation: "안쪽 반복 조건을 j < i 로 두면 i번째 줄에 별 i개가 찍힙니다.",
              starterCode: '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n',
              testCases: [
                { stdin: "3", expected: "*\n**\n***" },
                { stdin: "1", expected: "*" },
                { stdin: "4", expected: "*\n**\n***\n****", hidden: true },
              ],
            },
            {
              id: "c-u2-l2-c9",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'int total = 0;\nfor (int i = 1; i <= 2; i++) {\n    for (int j = 1; j <= 2; j++) {\n        total += i * j;\n    }\n}\nprintf("%d\\n", total);',
              explanation: "i,j 가 각각 1~2일 때 i*j 의 합은 1+2+2+4 = 9 입니다.",
              options: [
                { id: "a", text: "9", correct: true },
                { id: "b", text: "6", correct: false },
                { id: "c", text: "4", correct: false },
                { id: "d", text: "5", correct: false },
              ],
            },
            {
              id: "c-u2-l2-c10",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "c",
              question:
                "행의 개수 r과 열의 개수 c를 입력받아, '#'로 이루어진 r×c 직사각형을 출력하세요.",
              explanation: "바깥 반복 r번, 안쪽 반복 c번으로 '#'를 찍습니다.",
              starterCode:
                '#include <stdio.h>\n\nint main(void) {\n    int r, c;\n    scanf("%d %d", &r, &c);\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n',
              testCases: [
                { stdin: "2 3", expected: "###\n###" },
                { stdin: "1 4", expected: "####" },
                { stdin: "3 1", expected: "#\n#\n#", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c-u3",
      order: 3,
      title: "유닛 3 · 문자열 처리",
      description: "char 배열로 문자열을 다루는 법",
      lessons: [
        {
          id: "c-u3-l1",
          title: "문자열 기초",
          challenges: [
            {
              id: "c-u3-l1-c1",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "c",
              question: "사용자로부터 문자열을 입력받아 그 문자열을 거꾸로 뒤집어서 출력하는 프로그램을 작성하세요.\n예시\n입력: hello\n출력: olleh",
              explanation: "이 프로그램은 사용자가 입력한 문자열을 받아서, 문자열의 길이를 계산한 후, 그 길이를 기반으로 거꾸로 출력합니다. for 루프를 사용하여 문자열의 끝에서부터 시작하여 첫 글자까지 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "world",
                  expected: "dlrow"
                },
                {
                  stdin: "CodingGoring",
                  expected: "gniroGgnidoC"
                },
                {
                  stdin: "OpenAI",
                  expected: "IAnepO",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u3-l1-c2",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "c",
              question: "두 개의 문자열을 입력받아 strcmp 함수를 사용하여 두 문자열이 같은지 비교하고 결과를 출력하세요.\n예시\n입력: hello\nhello\n출력: 같습니다",
              explanation: "이 문제는 두 문자열을 입력받아 strcmp 함수를 사용하여 비교하는 방법을 배우는 것입니다. strcmp 함수는 두 문자열이 같으면 0을 반환하므로, 이를 이용해 조건문으로 결과를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "apple\napple",
                  expected: "같습니다"
                },
                {
                  stdin: "banana\norange",
                  expected: "다릅니다"
                },
                {
                  stdin: "test\nTest",
                  expected: "다릅니다",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u3-l1-c3",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 문자열에서 특정 문자가 몇 번 등장하는지 세는 프로그램을 작성하세요.\n예시\n입력: hello world\nl\n출력: 3",
              explanation: "이 프로그램은 사용자로부터 문자열과 특정 문자를 입력받고, 문자열을 반복하여 특정 문자가 몇 번 등장하는지 세는 방식으로 작동합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "programming in c\nm",
                  expected: "2"
                },
                {
                  stdin: "banana\nn",
                  expected: "2"
                },
                {
                  stdin: "hello world\nx",
                  expected: "0",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u3-l1-c4",
              conceptTags: ["string"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'char s[] = "hello";\nprintf("%lu\\n", strlen(s));',
              explanation: "strlen() 은 문자열의 길이(널 문자 제외)를 반환합니다. 'hello' 는 5글자.",
              options: [
                { id: "a", text: "5", correct: true },
                { id: "b", text: "6", correct: false },
                { id: "c", text: "4", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u3-l1-c5",
              conceptTags: ["string"],
              type: "FILL",
              language: "c",
              question: "문자열을 복사하도록 빈칸을 채우세요.",
              explanation: "문자열을 복사할 때는 strcpy(대상, 원본) 을 사용합니다.",
              fillCode: 'char src[] = "hi";\nchar dest[10];\n{{0}}(dest, src);\nprintf("%s\\n", dest);',
              fillAnswers: [["strcpy"]],
            },
            {
              id: "c-u3-l1-c6",
              conceptTags: ["string"],
              type: "PARSONS",
              language: "c",
              question: "두 문자열을 이어 붙여 출력하는 프로그램이 되도록 순서를 맞추세요.",
              explanation: "strcat(대상, 추가할 문자열) 은 대상 문자열 뒤에 이어 붙입니다.",
              parsonsLines: [
                "#include <stdio.h>",
                "#include <string.h>",
                "int main(void) {",
                '    char result[20] = "코드";',
                '    strcat(result, "런");',
                '    printf("%s\\n", result);',
                "    return 0;",
                "}",
              ],
            },
            {
              id: "c-u3-l1-c7",
              conceptTags: ["string", "debug"],
              type: "BUGFIX",
              language: "c",
              question: "문자열의 첫 글자 하나만 출력해야 하는데 형식이 맞지 않아 오류가 납니다. 버그를 고치세요.",
              explanation: "s[0] 은 문자(char) 하나이므로 %s 가 아니라 %c 로 출력해야 합니다.",
              starterCode: 'char s[] = "hello";\nprintf("%s\\n", s[0]);      // ← 버그\n',
              testCases: [{ expected: "h" }],
            },
            {
              id: "c-u3-l1-c8",
              conceptTags: ["string", "io"],
              type: "WRITE",
              language: "c",
              question:
                "문자열을 입력받아 그 안의 모음(a, e, i, o, u) 개수를 출력하세요.\n예시\n입력: hello\n출력: 2",
              explanation: "문자열을 순회하며 각 글자가 모음 5개 중 하나인지 확인해 개수를 셉니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "hello", expected: "2" },
                { stdin: "programming", expected: "3" },
                { stdin: "xyz", expected: "0", hidden: true },
              ],
            },
            {
              id: "c-u3-l1-c9",
              conceptTags: ["string"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'char s[10] = "ab";\nprintf("%lu\\n", sizeof(s));',
              explanation:
                "sizeof 는 배열 전체 크기(10바이트)를 반환합니다. strlen 과 달리 실제 글자 수와 다릅니다.",
              options: [
                { id: "a", text: "10", correct: true },
                { id: "b", text: "2", correct: false },
                { id: "c", text: "3", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u3-l1-c10",
              conceptTags: ["string", "io"],
              type: "WRITE",
              language: "c",
              question:
                "문자열을 입력받아 앞뒤가 같으면(팰린드롬이면) 'Yes', 아니면 'No' 를 출력하세요.\n예시\n입력: level\n출력: Yes",
              explanation: "앞에서부터 i번째와 뒤에서부터 i번째 글자를 비교합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "level", expected: "Yes" },
                { stdin: "hello", expected: "No" },
                { stdin: "a", expected: "Yes", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "c-u4",
      order: 4,
      title: "유닛 4 · 함수",
      description: "코드를 함수로 나눠 재사용하기",
      lessons: [
        {
          id: "c-u4-l1",
          title: "함수 정의",
          challenges: [
            {
              id: "c-u4-l1-c1",
              conceptTags: [
                "function"
              ],
              type: "WRITE",
              language: "c",
              question: "두 정수를 입력받아 그 중에서 최댓값을 반환하는 함수를 정의하세요.\n예시\n입력: 5 10\n출력: 10",
              explanation: "이 문제는 두 정수를 비교하여 더 큰 값을 반환하는 함수를 구현하는 것입니다. max 함수는 두 정수를 인자로 받아서 조건 연산자를 사용하여 최댓값을 결정합니다. main 함수에서는 사용자로부터 두 정수를 입력받고, max 함수를 호출하여 결과를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3 7",
                  expected: "7"
                },
                {
                  stdin: "15 10",
                  expected: "15"
                },
                {
                  stdin: "-5 -3",
                  expected: "-3",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u4-l1-c2",
              conceptTags: [
                "function"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 정수가 소수인지 판별하는 함수를 정의하세요. 소수는 1과 자기 자신만으로 나누어 떨어지는 1보다 큰 자연수입니다.\n예시\n입력: 7\n출력: Yes",
              explanation: "이 문제는 주어진 정수가 소수인지 아닌지를 판단하는 함수를 만드는 것입니다. 'is_prime' 함수는 입력된 정수가 소수인지 확인하고, main 함수에서 사용자로부터 입력을 받아 결과를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "1",
                  expected: "No"
                },
                {
                  stdin: "10",
                  expected: "No"
                },
                {
                  stdin: "13",
                  expected: "Yes",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u4-l1-c3",
              conceptTags: [
                "function",
                "pointer"
              ],
              type: "WRITE",
              language: "c",
              question: "두 개의 정수를 입력받아 서로 교환하는 함수를 정의하세요. 포인터를 사용하여 두 수의 값을 교환해야 합니다.\n예시\n입력: 5 10\n출력: 10 5",
              explanation: "이 문제는 포인터를 사용하여 두 변수의 값을 교환하는 함수를 구현하는 것입니다. swap 함수는 두 개의 포인터를 매개변수로 받아서, 각 포인터가 가리키는 값들을 서로 교환합니다. main 함수에서는 두 정수를 입력받고, swap 함수를 호출하여 교환한 후 결과를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3 7",
                  expected: "7 3"
                },
                {
                  stdin: "-1 1",
                  expected: "1 -1"
                },
                {
                  stdin: "0 0",
                  expected: "0 0",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u4-l1-c4",
              conceptTags: ["function"],
              type: "SELECT",
              language: "c",
              question: "다음 프로그램의 출력은?",
              codeSnippet: 'int add(int a, int b) {\n    return a + b;\n}\n\nint main(void) {\n    printf("%d\\n", add(3, 4));\n    return 0;\n}',
              explanation: "add(3, 4) 는 3+4 를 계산해 7을 반환합니다.",
              options: [
                { id: "a", text: "7", correct: true },
                { id: "b", text: "34", correct: false },
                { id: "c", text: "a + b", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u4-l1-c5",
              conceptTags: ["function"],
              type: "FILL",
              language: "c",
              question: "정수를 반환하는 함수가 되도록 반환 타입을 채우세요.",
              explanation: "정수를 반환하는 함수는 반환 타입을 int 로 선언합니다.",
              fillCode: "{{0}} square(int n) {\n    return n * n;\n}",
              fillAnswers: [["int"]],
            },
            {
              id: "c-u4-l1-c6",
              conceptTags: ["function"],
              type: "PARSONS",
              language: "c",
              question: "두 수를 곱해 반환하는 함수를 정의하고 호출하는 프로그램이 되도록 순서를 맞추세요.",
              explanation: "함수를 먼저 정의한 뒤, main 에서 호출해 결과를 출력합니다.",
              parsonsLines: [
                "#include <stdio.h>",
                "int multiply(int a, int b) {",
                "    return a * b;",
                "}",
                "int main(void) {",
                '    printf("%d\\n", multiply(3, 4));',
                "    return 0;",
                "}",
              ],
            },
            {
              id: "c-u4-l1-c7",
              conceptTags: ["function", "debug"],
              type: "BUGFIX",
              language: "c",
              question: "10에서 3을 뺀 값이 나와야 하는데 인자 순서가 바뀌어 음수가 나옵니다. 버그를 고치세요.",
              explanation: "subtract(a, b) 는 a - b 를 계산하므로 subtract(x, y) 순서로 호출해야 합니다.",
              starterCode:
                'int subtract(int a, int b) {\n    return a - b;\n}\n\nint main(void) {\n    int x = 10, y = 3;\n    printf("%d\\n", subtract(y, x));      // ← 버그\n    return 0;\n}\n',
              testCases: [{ expected: "7" }],
            },
            {
              id: "c-u4-l1-c8",
              conceptTags: ["function", "condition", "io"],
              type: "WRITE",
              language: "c",
              question:
                "연도를 입력받아 윤년이면 'Yes', 아니면 'No' 를 출력하는 함수 is_leap(int year) 를 작성해 사용하세요. (4의 배수이면서 100의 배수가 아니거나, 400의 배수이면 윤년)",
              explanation: "(year%4==0 && year%100!=0) || year%400==0 조건으로 판별합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "2024", expected: "Yes" },
                { stdin: "1900", expected: "No" },
                { stdin: "2000", expected: "Yes", hidden: true },
              ],
            },
            {
              id: "c-u4-l1-c9",
              conceptTags: ["function"],
              type: "SELECT",
              language: "c",
              question: "다음 프로그램의 출력은?",
              codeSnippet: 'void greet(void) {\n    printf("Hi\\n");\n}\n\nint main(void) {\n    greet();\n    return 0;\n}',
              explanation: "void 함수는 값을 반환하지 않고 동작만 수행합니다. greet() 호출로 'Hi' 가 출력됩니다.",
              options: [
                { id: "a", text: "Hi", correct: true },
                { id: "b", text: "0", correct: false },
                { id: "c", text: "아무것도 출력 안 됨", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u4-l1-c10",
              conceptTags: ["function", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수를 입력받아 그 자릿수를 반환하는 함수 count_digits(int n) 를 작성해 사용하세요. (n은 0 이상의 정수)\n예시\n입력: 12345\n출력: 5",
              explanation: "n을 10으로 나누며 0이 될 때까지 반복한 횟수를 세면 자릿수가 됩니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "12345", expected: "5" },
                { stdin: "7", expected: "1" },
                { stdin: "1000", expected: "4", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "c-u5",
      order: 5,
      title: "유닛 5 · 구조체",
      description: "여러 데이터를 하나로 묶는 struct",
      lessons: [
        {
          id: "c-u5-l1",
          title: "구조체 기초",
          challenges: [
            {
              id: "c-u5-l1-c1",
              conceptTags: [
                "oop"
              ],
              type: "WRITE",
              language: "c",
              question: "구조체를 사용하여 학생의 이름과 나이를 저장하고 출력하는 프로그램을 작성하세요.\n예시\n입력: 홍길동\n20\n출력: 이름: 홍길동, 나이: 20",
              explanation: "이 프로그램은 구조체를 사용하여 학생의 이름과 나이를 저장하고, 입력받은 값을 출력하는 간단한 예제입니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "김철수\n25",
                  expected: "이름: 김철수, 나이: 25"
                },
                {
                  stdin: "이영희\n30",
                  expected: "이름: 이영희, 나이: 30"
                },
                {
                  stdin: "박지민\n15",
                  expected: "이름: 박지민, 나이: 15",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u5-l1-c2",
              conceptTags: [
                "oop",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "여러 명의 학생 점수를 입력받아 각 학생의 점수를 합산하여 출력하는 프로그램을 작성하세요. 학생의 수는 10명으로 제한합니다.\n예시\n입력: 3\n홍길동 85\n김철수 90\n이영희 78\n\n출력: 홍길동: 85\n김철수: 90\n이영희: 78\n",
              explanation: "이 프로그램은 학생의 수와 각 학생의 이름 및 점수를 입력받아 구조체 배열을 사용하여 저장합니다. 이후 각 학생의 이름과 점수를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "2\n최민수 60\n박지민 70\n",
                  expected: "최민수: 60\n박지민: 70\n"
                },
                {
                  stdin: "5\n이순신 100\n강감찬 95\n유관순 88\n세종대왕 92\n김구 85\n",
                  expected: "이순신: 100\n강감찬: 95\n유관순: 88\n세종대왕: 92\n김구: 85\n"
                },
                {
                  stdin: "1\n홍길동 50\n",
                  expected: "홍길동: 50\n",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u5-l1-c3",
              conceptTags: [
                "oop",
                "function"
              ],
              type: "WRITE",
              language: "c",
              question: "두 개의 좌표(x1, y1)와(x2, y2)가 주어질 때, 이 두 좌표 사이의 거리를 계산하는 함수를 작성하세요. 거리 계산에는 수학 라이브러리의 sqrt 함수를 사용해야 합니다.\n예시\n입력: 1 2\n4 6\n출력: 5.00",
              explanation: "이 문제는 C 언어의 구조체와 함수를 사용하여 두 점 사이의 거리를 계산하는 방법을 배우는 데 도움을 줍니다. 구조체를 사용하여 점의 좌표를 저장하고, 함수를 통해 두 점 사이의 거리를 계산합니다. 이 과정에서 sqrt와 pow 함수를 사용하여 수학적 계산을 수행합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "0 0\n3 4",
                  expected: "5.00"
                },
                {
                  stdin: "-1 -1\n1 1",
                  expected: "2.83"
                },
                {
                  stdin: "100 100\n200 200",
                  expected: "141.42",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u5-l1-c4",
              conceptTags: ["oop"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'struct Point {\n    int x;\n    int y;\n};\n\nstruct Point p = {3, 4};\nprintf("%d\\n", p.x);',
              explanation: "구조체 변수의 멤버는 점(.) 연산자로 접근합니다. p.x 는 3.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "4", correct: false },
                { id: "c", text: "p.x", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u5-l1-c5",
              conceptTags: ["oop"],
              type: "FILL",
              language: "c",
              question: "구조체 변수 p의 y 멤버를 출력하도록 빈칸을 채우세요.",
              explanation: "구조체 멤버 접근에는 점(.) 연산자를 사용합니다.",
              fillCode: "struct Point { int x; int y; };\nstruct Point p = {1, 2};\nprintf(\"%d\\n\", p{{0}}y);",
              fillAnswers: [["."]],
            },
            {
              id: "c-u5-l1-c6",
              conceptTags: ["oop"],
              type: "PARSONS",
              language: "c",
              question: "구조체를 정의하고 멤버를 출력하는 프로그램이 되도록 순서를 맞추세요.",
              explanation: "구조체 정의 → 변수 선언과 초기화 → 멤버 접근 순서로 작성합니다.",
              parsonsLines: [
                "#include <stdio.h>",
                "struct Book {",
                "    char title[20];",
                "    int pages;",
                "};",
                "int main(void) {",
                '    struct Book b = {"C언어", 300};',
                '    printf("%d\\n", b.pages);',
                "    return 0;",
                "}",
              ],
            },
            {
              id: "c-u5-l1-c7",
              conceptTags: ["oop", "debug"],
              type: "BUGFIX",
              language: "c",
              question: "존재하지 않는 멤버를 사용해 오류가 납니다. y 값이 출력되도록 고치세요.",
              explanation: "구조체 Point 는 x, y 멤버만 가지고 있습니다. z 는 없으므로 p.y 로 고쳐야 합니다.",
              starterCode: 'struct Point { int x; int y; };\nstruct Point p = {5, 9};\nprintf("%d\\n", p.z);      // ← 버그\n',
              testCases: [{ expected: "9" }],
            },
            {
              id: "c-u5-l1-c8",
              conceptTags: ["oop", "io"],
              type: "WRITE",
              language: "c",
              question:
                "가로와 세로를 멤버로 갖는 구조체 Rect 를 정의하고, 입력받은 값으로 넓이를 계산해 출력하세요.\n예시\n입력: 3 5\n출력: 15",
              explanation: "구조체에 width, height 멤버를 두고 곱해서 넓이를 구합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "3 5", expected: "15" },
                { stdin: "4 4", expected: "16" },
                { stdin: "10 2", expected: "20", hidden: true },
              ],
            },
            {
              id: "c-u5-l1-c9",
              conceptTags: ["oop"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'struct Point { int x; };\nstruct Point a = {1};\nstruct Point b = a;\nb.x = 99;\nprintf("%d\\n", a.x);',
              explanation:
                "구조체를 대입하면 값이 통째로 복사됩니다. b를 바꿔도 a는 영향을 받지 않아 그대로 1입니다.",
              options: [
                { id: "a", text: "1", correct: true },
                { id: "b", text: "99", correct: false },
                { id: "c", text: "0", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u5-l1-c10",
              conceptTags: ["oop", "list", "io"],
              type: "WRITE",
              language: "c",
              question:
                "학생 이름과 점수를 구조체 배열로 n명 입력받아, 가장 높은 점수를 받은 학생의 이름을 출력하세요.\n예시\n입력: 2\n철수 80\n영희 95\n출력: 영희",
              explanation: "구조체 배열을 순회하며 최고 점수와 그 이름을 갱신합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "2\n철수 80\n영희 95", expected: "영희" },
                { stdin: "3\nA 10\nB 20\nC 15", expected: "B" },
                { stdin: "1\n민수 50", expected: "민수", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "c-u6",
      order: 6,
      title: "유닛 6 · 동적 메모리 심화",
      description: "malloc과 free로 크기가 정해지지 않은 데이터 다루기",
      lessons: [
        {
          id: "c-u6-l1",
          title: "malloc과 free",
          challenges: [
            {
              id: "c-u6-l1-c1",
              conceptTags: [
                "memory"
              ],
              type: "WRITE",
              language: "c",
              question: "사용자로부터 정수 배열의 크기를 입력받고, 동적으로 메모리를 할당하여 배열을 생성한 후, 배열의 모든 요소의 합계를 구하세요. 마지막으로 할당한 메모리를 해제해야 합니다.\n예시\n입력: 5\n1 2 3 4 5\n출력: 15",
              explanation: "이 문제는 사용자가 입력한 정수 배열의 크기만큼 메모리를 동적으로 할당하고, 입력받은 정수들을 배열에 저장한 후, 배열의 합계를 계산하는 방법을 배우는 데 도움을 줍니다. malloc을 사용하여 메모리를 할당하고, free를 사용하여 해제하는 것이 중요합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3\n10 20 30",
                  expected: "60"
                },
                {
                  stdin: "4\n-1 -2 -3 -4",
                  expected: "-10"
                },
                {
                  stdin: "2\n100 200",
                  expected: "300",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u6-l1-c2",
              conceptTags: [
                "memory"
              ],
              type: "WRITE",
              language: "c",
              question: "사용자로부터 입력받은 개수만큼의 정수를 동적으로 할당한 배열에 저장하고, 그 배열의 평균을 계산하여 출력하는 프로그램을 작성하세요.\n예시\n입력: 5\n10 20 30 40 50\n출력: 30.00",
              explanation: "이 프로그램은 먼저 사용자가 입력한 정수 N을 읽고, malloc을 사용하여 N개의 정수를 저장할 수 있는 배열을 동적으로 할당합니다. 이후 사용자가 입력한 N개의 정수를 배열에 저장하고, 배열의 모든 요소를 더한 후 평균을 계산하여 소수점 이하 두 자리까지 출력합니다. 마지막으로 동적으로 할당한 메모리를 해제합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3\n1 2 3",
                  expected: "2.00"
                },
                {
                  stdin: "4\n10 20 30 40",
                  expected: "25.00"
                },
                {
                  stdin: "2\n-10 10",
                  expected: "0.00",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u6-l1-c3",
              conceptTags: [
                "memory",
                "string"
              ],
              type: "WRITE",
              language: "c",
              question: "사용자로부터 입력받은 문자열을 동적으로 메모리에 할당하여 복사한 후, 복사된 문자열을 출력하는 프로그램을 작성하세요.\n예시\n입력: 안녕하세요\n출력: 안녕하세요",
              explanation: "이 프로그램은 사용자가 입력한 문자열을 동적으로 메모리에 할당하여 복사합니다. 'malloc'을 사용하여 메모리를 할당하고, 'strcpy'를 사용하여 문자열을 복사한 후, 복사된 문자열을 출력합니다. 마지막으로 'free'를 사용하여 할당한 메모리를 해제합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "안녕하세요",
                  expected: "안녕하세요"
                },
                {
                  stdin: "CodingGoring",
                  expected: "CodingGoring"
                },
                {
                  stdin: "동적 메모리 할당",
                  expected: "동적 메모리 할당",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u6-l1-c4",
              conceptTags: ["memory"],
              type: "SELECT",
              language: "c",
              question: "메모리 할당이 정상적으로 이루어졌다면 다음의 출력은?",
              codeSnippet:
                'int *p = malloc(5 * sizeof(int));\nif (p == NULL) {\n    printf("할당 실패\\n");\n} else {\n    printf("할당 성공\\n");\n}',
              explanation: "malloc 이 성공하면 유효한 주소를 반환하므로 NULL 이 아니라서 else 블록이 실행됩니다.",
              options: [
                { id: "a", text: "할당 성공", correct: true },
                { id: "b", text: "할당 실패", correct: false },
                { id: "c", text: "아무것도 출력 안 됨", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u6-l1-c5",
              conceptTags: ["memory"],
              type: "FILL",
              language: "c",
              question: "정수 3개를 담을 배열을 동적으로 할당하도록 빈칸을 채우세요.",
              explanation: "동적 메모리를 할당할 때는 malloc(바이트 수) 를 사용합니다.",
              fillCode: "int *arr = {{0}}(3 * sizeof(int));",
              fillAnswers: [["malloc"]],
            },
            {
              id: "c-u6-l1-c6",
              conceptTags: ["memory"],
              type: "PARSONS",
              language: "c",
              question: "정수 배열을 동적 할당하고 사용한 뒤 해제하는 프로그램이 되도록 순서를 맞추세요.",
              explanation: "할당(malloc) → 사용 → 해제(free) 순서를 지켜야 메모리 누수가 없습니다.",
              parsonsLines: [
                "#include <stdio.h>",
                "#include <stdlib.h>",
                "int main(void) {",
                "    int *arr = malloc(3 * sizeof(int));",
                "    arr[0] = 10;",
                '    printf("%d\\n", arr[0]);',
                "    free(arr);",
                "    return 0;",
                "}",
              ],
            },
            {
              id: "c-u6-l1-c7",
              conceptTags: ["memory", "debug"],
              type: "BUGFIX",
              language: "c",
              question: "배열 3개의 합이 나와야 하는데 두 개만 더해집니다. 버그를 고치세요.",
              explanation: "반복 조건이 i < 2 이면 마지막 원소가 빠집니다. i < 3 으로 고쳐야 합니다.",
              starterCode:
                "int *arr = malloc(3 * sizeof(int));\narr[0] = 1; arr[1] = 2; arr[2] = 3;\nint sum = 0;\nfor (int i = 0; i < 2; i++) {  // ← 버그\n    sum += arr[i];\n}\nprintf(\"%d\\n\", sum);\nfree(arr);\n",
              testCases: [{ expected: "6" }],
            },
            {
              id: "c-u6-l1-c8",
              conceptTags: ["memory", "list", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수의 개수 n과 그 값들을 입력받아 동적 배열에 저장한 뒤, 역순으로 한 줄에 공백으로 구분해 출력하세요.\n예시\n입력: 3\n1 2 3\n출력: 3 2 1",
              explanation: "malloc(n * sizeof(int)) 으로 배열을 만든 뒤, 뒤에서부터 순회하며 출력합니다.",
              starterCode: "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "3\n1 2 3", expected: "3 2 1" },
                { stdin: "5\n10 20 30 40 50", expected: "50 40 30 20 10" },
                { stdin: "1\n7", expected: "7", hidden: true },
              ],
            },
            {
              id: "c-u6-l1-c9",
              conceptTags: ["memory"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'int *arr = calloc(3, sizeof(int));\nprintf("%d\\n", arr[0]);',
              explanation: "calloc 은 할당한 메모리를 0으로 초기화합니다. malloc 과 달리 초기값이 보장됩니다.",
              options: [
                { id: "a", text: "0", correct: true },
                { id: "b", text: "쓰레기 값", correct: false },
                { id: "c", text: "1", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u6-l1-c10",
              conceptTags: ["memory", "list", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수의 개수 n과 그 값들을 입력받아 동적 배열에 저장한 뒤, 최댓값과 최솟값을 공백으로 구분해 출력하세요.\n예시\n입력: 4\n3 1 4 2\n출력: 4 1",
              explanation: "동적 배열을 순회하며 최댓값과 최솟값을 갱신합니다.",
              starterCode: "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "4\n3 1 4 2", expected: "4 1" },
                { stdin: "3\n10 20 5", expected: "20 5" },
                { stdin: "1\n7", expected: "7 7", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "c-u7",
      order: 7,
      title: "유닛 7 · 재귀 함수",
      description: "함수가 자기 자신을 호출해 문제를 나눠 풀기",
      lessons: [
        {
          id: "c-u7-l1",
          title: "재귀로 풀기",
          challenges: [
            {
              id: "c-u7-l1-c1",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "c",
              question: "재귀 함수를 사용하여 주어진 정수의 팩토리얼을 계산하는 프로그램을 작성하세요.\n예시\n입력: 5\n출력: 120",
              explanation: "이 프로그램은 재귀 함수를 사용하여 주어진 정수 N의 팩토리얼을 계산합니다. 팩토리얼은 N이 0일 때 1이며, 그 외의 경우 N과 N-1의 팩토리얼을 곱한 값입니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "1"
                },
                {
                  stdin: "3",
                  expected: "6"
                },
                {
                  stdin: "4",
                  expected: "24",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u7-l1-c2",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "c",
              question: "재귀 함수를 사용하여 n번째 피보나치 수를 구하는 프로그램을 작성하세요. 피보나치 수열은 다음과 같이 정의됩니다: F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) (n >= 2).\n예시\n입력: 5\n출력: 5",
              explanation: "이 프로그램은 재귀 함수를 사용하여 n번째 피보나치 수를 계산합니다. 기본 케이스로 n이 0 또는 1일 때의 값을 반환하고, 그 외의 경우에는 n-1과 n-2의 피보나치 수를 합산하여 결과를 반환합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "0"
                },
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "6",
                  expected: "8",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u7-l1-c3",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "c",
              question: "재귀 함수를 사용하여 1부터 n까지의 합을 구하는 프로그램을 작성하세요.\n예시\n입력: 5\n출력: 15",
              explanation: "이 프로그램은 재귀 함수를 사용하여 1부터 n까지의 합을 계산합니다. 함수 sum은 n이 1일 때 1을 반환하고, 그렇지 않으면 n과 sum(n-1)의 합을 반환합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "10",
                  expected: "55"
                },
                {
                  stdin: "100",
                  expected: "5050",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u7-l1-c4",
              conceptTags: ["recursion"],
              type: "SELECT",
              language: "c",
              question: "다음 프로그램의 출력은?",
              codeSnippet: 'int f(int n) {\n    if (n == 0) return 0;\n    return n + f(n - 1);\n}\n\nint main(void) {\n    printf("%d\\n", f(3));\n    return 0;\n}',
              explanation: "f(3) = 3 + f(2) = 3+2+f(1) = 3+2+1+f(0) = 6.",
              options: [
                { id: "a", text: "6", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "0", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u7-l1-c5",
              conceptTags: ["recursion"],
              type: "FILL",
              language: "c",
              question: "n이 0일 때 1을 반환하도록(팩토리얼의 기저 조건) 빈칸을 채우세요.",
              explanation: "0! 은 1로 정의되므로 기저 조건에서 1을 반환해야 합니다.",
              fillCode: "int factorial(int n) {\n    if (n == 0) return {{0}};\n    return n * factorial(n - 1);\n}",
              fillAnswers: [["1"]],
            },
            {
              id: "c-u7-l1-c6",
              conceptTags: ["recursion"],
              type: "PARSONS",
              language: "c",
              question: "n부터 1까지 출력한 뒤 재귀를 멈추는 함수가 되도록 순서를 맞추세요.",
              explanation: "n이 0이 되면 return 으로 재귀를 멈추고, 그 전엔 출력 후 n-1 로 자신을 호출합니다.",
              parsonsLines: [
                "void countdown(int n) {",
                "    if (n == 0) {",
                "        return;",
                "    }",
                '    printf("%d\\n", n);',
                "    countdown(n - 1);",
                "}",
              ],
            },
            {
              id: "c-u7-l1-c7",
              conceptTags: ["recursion", "debug"],
              type: "BUGFIX",
              language: "c",
              question: "0! 은 1이어야 하는데 기저 조건이 잘못되어 항상 0이 출력됩니다. 버그를 고치세요.",
              explanation: "곱셈의 기저 조건은 0이 아니라 1이어야 합니다.",
              starterCode:
                'int factorial(int n) {\n    if (n == 0) return 0;      // ← 버그\n    return n * factorial(n - 1);\n}\n\nint main(void) {\n    printf("%d\\n", factorial(4));\n    return 0;\n}\n',
              testCases: [{ expected: "24" }],
            },
            {
              id: "c-u7-l1-c8",
              conceptTags: ["recursion", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수 x와 n(0 이상)을 입력받아, 재귀 함수로 x의 n제곱을 계산해 출력하세요.\n예시\n입력: 2 5\n출력: 32",
              explanation: "기저 조건 n==0 이면 1을 반환하고, 그 외엔 x * power(x, n-1) 을 반환합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "2 5", expected: "32" },
                { stdin: "3 0", expected: "1" },
                { stdin: "5 2", expected: "25", hidden: true },
              ],
            },
            {
              id: "c-u7-l1-c9",
              conceptTags: ["recursion"],
              type: "SELECT",
              language: "c",
              question: "다음 프로그램의 출력은?",
              codeSnippet: 'int rec(int n) {\n    if (n <= 1) return 1;\n    return rec(n - 1) + rec(n - 2);\n}\n\nint main(void) {\n    printf("%d\\n", rec(4));\n    return 0;\n}',
              explanation: "rec(4) = rec(3)+rec(2) = 3+2 = 5 입니다 (기저 조건: n<=1 이면 1).",
              options: [
                { id: "a", text: "5", correct: true },
                { id: "b", text: "4", correct: false },
                { id: "c", text: "8", correct: false },
                { id: "d", text: "3", correct: false },
              ],
            },
            {
              id: "c-u7-l1-c10",
              conceptTags: ["recursion", "io"],
              type: "WRITE",
              language: "c",
              question:
                "0 이상의 정수를 입력받아 각 자릿수의 합을 재귀 함수로 구해 출력하세요.\n예시\n입력: 123\n출력: 6",
              explanation: "n이 한 자리 수(n < 10)면 n을 반환하고, 그 외엔 n%10 + digit_sum(n/10) 을 반환합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "123", expected: "6" },
                { stdin: "9", expected: "9" },
                { stdin: "1000", expected: "1", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "c-u8",
      order: 8,
      title: "유닛 8 · 포인터 심화",
      description: "포인터와 배열의 관계 이해하기",
      lessons: [
        {
          id: "c-u8-l1",
          title: "포인터와 배열",
          challenges: [
            {
              id: "c-u8-l1-c1",
              conceptTags: [
                "pointer",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 정수 배열의 원소를 포인터를 사용하여 출력하는 프로그램을 작성하세요.\n예시\n입력: 5\n1 2 3 4 5\n출력: 1\n2\n3\n4\n5",
              explanation: "이 프로그램은 먼저 사용자로부터 배열의 크기 n을 입력받고, n개의 정수를 배열에 저장합니다. 그 다음, 포인터 ptr를 사용하여 배열의 각 원소를 출력합니다. 포인터를 이용해 배열 원소에 접근하는 방법을 연습할 수 있습니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3\n10 20 30",
                  expected: "10\n20\n30"
                },
                {
                  stdin: "4\n-1 0 1 2",
                  expected: "-1\n0\n1\n2"
                },
                {
                  stdin: "2\n100 200",
                  expected: "100\n200",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u8-l1-c2",
              conceptTags: [
                "pointer",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 정수 배열의 모든 요소의 합계를 계산하는 프로그램을 작성하세요. 포인터를 사용하여 배열을 순회해야 합니다.\n예시\n입력: 5\n1 2 3 4 5\n출력: 15",
              explanation: "이 프로그램은 먼저 배열의 크기를 입력받고, 그 다음 배열의 요소를 입력받습니다. 포인터를 사용하여 배열을 순회하며 각 요소를 더하여 최종 합계를 계산합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3\n10 20 30",
                  expected: "60"
                },
                {
                  stdin: "4\n-1 -2 -3 -4",
                  expected: "-10"
                },
                {
                  stdin: "2\n100 200",
                  expected: "300",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u8-l1-c3",
              conceptTags: [
                "pointer",
                "function"
              ],
              type: "WRITE",
              language: "c",
              question: "포인터를 이용하여 주어진 정수 배열의 합을 구하는 함수를 작성하세요.\n예시\n입력: 5\n1 2 3 4 5\n출력: 15",
              explanation: "이 문제에서는 포인터를 사용하여 배열의 합을 구하는 함수를 작성합니다. sumArray 함수는 포인터를 통해 배열을 받아와 각 요소를 더하여 합을 반환합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3\n10 20 30",
                  expected: "60"
                },
                {
                  stdin: "4\n-1 -2 -3 -4",
                  expected: "-10"
                },
                {
                  stdin: "2\n1000 -1000",
                  expected: "0",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u8-l1-c4",
              conceptTags: ["pointer", "list"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'int arr[3] = {10, 20, 30};\nprintf("%d\\n", *(arr + 1));',
              explanation: "배열 이름 arr 은 첫 원소의 주소와 같습니다. *(arr+1) 은 arr[1] 과 같은 20입니다.",
              options: [
                { id: "a", text: "20", correct: true },
                { id: "b", text: "10", correct: false },
                { id: "c", text: "30", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u8-l1-c5",
              conceptTags: ["pointer", "list"],
              type: "FILL",
              language: "c",
              question: "arr[2] 와 같은 값을 포인터 연산으로 출력하도록 빈칸을 채우세요.",
              explanation: "*(arr + 2) 는 arr[2] 와 같은 값을 가리킵니다.",
              fillCode: 'int arr[3] = {5, 6, 7};\nprintf("%d\\n", *(arr {{0}} 2));',
              fillAnswers: [["+"]],
            },
            {
              id: "c-u8-l1-c6",
              conceptTags: ["pointer", "list"],
              type: "PARSONS",
              language: "c",
              question: "포인터로 배열을 순회하며 합을 구해 출력하는 프로그램이 되도록 순서를 맞추세요.",
              explanation: "포인터 p 가 배열의 시작을 가리키고, p+i 로 각 원소에 접근합니다.",
              parsonsLines: [
                "int arr[3] = {1, 2, 3};",
                "int *p = arr;",
                "int sum = 0;",
                "for (int i = 0; i < 3; i++) {",
                "    sum += *(p + i);",
                "}",
                'printf("%d\\n", sum);',
              ],
            },
            {
              id: "c-u8-l1-c7",
              conceptTags: ["pointer", "debug"],
              type: "BUGFIX",
              language: "c",
              question:
                "배열 전체의 합이 나와야 하는데 포인터가 두 칸씩 건너뛰어 잘못된 값이 나옵니다. 버그를 고치세요.",
              explanation: "각 원소를 하나씩 읽으려면 포인터를 1칸씩(p += 1) 옮겨야 합니다.",
              starterCode:
                'int arr[3] = {10, 20, 30};\nint *p = arr;\nint sum = 0;\nfor (int i = 0; i < 3; i++) {\n    sum += *p;\n    p += 2;      // ← 버그\n}\nprintf("%d\\n", sum);\n',
              testCases: [{ expected: "60" }],
            },
            {
              id: "c-u8-l1-c8",
              conceptTags: ["pointer", "string", "io"],
              type: "WRITE",
              language: "c",
              question:
                "문자열을 입력받아, 포인터를 이용해(strlen 없이) 그 길이를 계산해 출력하세요.\n예시\n입력: hello\n출력: 5",
              explanation: "문자 포인터를 널 문자('\\0')를 만날 때까지 한 칸씩 옮기며 개수를 셉니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "hello", expected: "5" },
                { stdin: "code", expected: "4" },
                { stdin: "a", expected: "1", hidden: true },
              ],
            },
            {
              id: "c-u8-l1-c9",
              conceptTags: ["pointer", "list"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: 'int arr[3] = {1, 2, 3};\nint *p = arr;\nprintf("%d\\n", p == &arr[0]);',
              explanation:
                "배열 이름은 첫 원소의 주소로 변환되므로 p 와 &arr[0] 은 같은 주소입니다. 참이면 1이 출력됩니다.",
              options: [
                { id: "a", text: "1", correct: true },
                { id: "b", text: "0", correct: false },
                { id: "c", text: "arr", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u8-l1-c10",
              conceptTags: ["pointer", "list", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수 배열과 두 인덱스를 입력받아, 포인터를 이용해 두 인덱스의 값을 맞바꾼 뒤 배열 전체를 출력하세요.\n예시\n입력: 5\n1 2 3 4 5\n0 4\n출력: 5 2 3 4 1",
              explanation: "두 포인터로 각 값을 가리켜 temp 변수를 거쳐 교환합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "5\n1 2 3 4 5\n0 4", expected: "5 2 3 4 1" },
                { stdin: "3\n10 20 30\n1 2", expected: "10 30 20" },
                { stdin: "4\n1 1 1 1\n0 3", expected: "1 1 1 1", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "c-u9",
      order: 9,
      title: "유닛 9 · 정렬과 탐색",
      description: "배열을 정렬하고 원하는 값을 찾기",
      lessons: [
        {
          id: "c-u9-l1",
          title: "정렬·탐색 기초",
          challenges: [
            {
              id: "c-u9-l1-c1",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 정수 배열을 오름차순으로 정렬하는 버블 정렬 알고리즘을 구현하세요.\n예시\n입력: 5\n5 3 8 1 2\n출력: 1 2 3 5 8",
              explanation: "버블 정렬 알고리즘은 배열을 반복적으로 순회하면서 인접한 두 요소를 비교하여 정렬하는 방식입니다. 이 코드는 배열의 크기를 입력받고, 배열을 버블 정렬로 정렬한 후 결과를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3\n3 1 2",
                  expected: "1 2 3"
                },
                {
                  stdin: "4\n4 4 4 4",
                  expected: "4 4 4 4"
                },
                {
                  stdin: "6\n10 -1 2 0 5 3",
                  expected: "-1 0 2 3 5 10",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u9-l1-c2",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 정수 배열에서 특정 값을 선형 탐색을 통해 찾는 프로그램을 작성하세요. 값이 배열에 존재하면 해당 값의 인덱스를 출력하고, 존재하지 않으면 -1을 출력합니다.\n예시\n입력: 5\n1 2 3 4 5\n3\n출력: 2",
              explanation: "이 프로그램은 배열의 크기와 요소를 입력받고, 사용자가 찾고자 하는 값을 배열에서 선형 탐색을 통해 찾습니다. 배열을 처음부터 끝까지 순회하면서 해당 값이 발견되면 인덱스를 출력하고, 끝까지 탐색한 후에도 발견되지 않으면 -1을 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "5\n1 2 3 4 5\n3",
                  expected: "2"
                },
                {
                  stdin: "4\n10 20 30 40\n25",
                  expected: "-1"
                },
                {
                  stdin: "6\n7 8 9 10 11 12\n10",
                  expected: "3",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u9-l1-c3",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 정렬된 배열에서 특정 값을 이진 탐색을 사용하여 찾는 프로그램을 작성하세요. 값이 배열에 존재하면 해당 값의 인덱스를 출력하고, 존재하지 않으면 -1을 출력해야 합니다.\n예시\n입력: 5\n1 3 5 7 9\n5\n출력: 2",
              explanation: "이 프로그램은 주어진 정렬된 배열에서 이진 탐색 알고리즘을 사용하여 특정 값을 찾습니다. 이진 탐색은 배열을 반으로 나누어 검색 범위를 줄여가며 값을 찾는 효율적인 방법입니다. 배열의 중간 값을 확인하고, 찾고자 하는 값과 비교하여 검색 범위를 조정합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "5\n1 3 5 7 9\n3",
                  expected: "1"
                },
                {
                  stdin: "6\n2 4 6 8 10 12\n11",
                  expected: "-1"
                },
                {
                  stdin: "7\n10 20 30 40 50 60 70\n70",
                  expected: "6",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u9-l1-c4",
              conceptTags: ["algorithm", "list"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet:
                'int arr[3] = {3, 1, 2};\nint temp;\nif (arr[0] > arr[1]) {\n    temp = arr[0];\n    arr[0] = arr[1];\n    arr[1] = temp;\n}\nprintf("%d %d %d\\n", arr[0], arr[1], arr[2]);',
              explanation: "arr[0](3) 이 arr[1](1) 보다 크므로 두 값을 맞바꿔 1 3 2 가 됩니다.",
              options: [
                { id: "a", text: "1 3 2", correct: true },
                { id: "b", text: "3 1 2", correct: false },
                { id: "c", text: "1 2 3", correct: false },
                { id: "d", text: "2 1 3", correct: false },
              ],
            },
            {
              id: "c-u9-l1-c5",
              conceptTags: ["algorithm"],
              type: "FILL",
              language: "c",
              question: "오름차순 정렬을 위해 인접한 두 값의 순서가 잘못됐는지 확인하도록 빈칸을 채우세요.",
              explanation: "오름차순 정렬에서는 앞의 값이 뒤의 값보다 크면(>) 순서가 잘못된 것이므로 교환합니다.",
              fillCode: "if (arr[i] {{0}} arr[i + 1]) {\n    // swap\n}",
              fillAnswers: [[">"]],
            },
            {
              id: "c-u9-l1-c6",
              conceptTags: ["algorithm", "list"],
              type: "PARSONS",
              language: "c",
              question: "배열에서 특정 값을 찾아 인덱스를 출력하는 프로그램이 되도록 순서를 맞추세요 (없으면 -1).",
              explanation: "배열을 순회하며 찾는 값과 같은 인덱스를 idx 에 저장합니다.",
              parsonsLines: [
                "int arr[4] = {5, 3, 8, 1};",
                "int target = 8, idx = -1;",
                "for (int i = 0; i < 4; i++) {",
                "    if (arr[i] == target) {",
                "        idx = i;",
                "    }",
                "}",
                'printf("%d\\n", idx);',
              ],
            },
            {
              id: "c-u9-l1-c7",
              conceptTags: ["algorithm", "debug"],
              type: "BUGFIX",
              language: "c",
              question: "배열의 마지막 원소를 못 찾는 버그가 있습니다. target(4)의 인덱스가 나오도록 고치세요.",
              explanation: "반복 조건이 i < 3 이면 마지막 인덱스(3)를 검사하지 못합니다. i < 4 로 고쳐야 합니다.",
              starterCode:
                "int arr[4] = {1, 2, 3, 4};\nint target = 4, idx = -1;\nfor (int i = 0; i < 3; i++) {  // ← 버그\n    if (arr[i] == target) {\n        idx = i;\n    }\n}\nprintf(\"%d\\n\", idx);\n",
              testCases: [{ expected: "3" }],
            },
            {
              id: "c-u9-l1-c8",
              conceptTags: ["algorithm", "list", "io"],
              type: "WRITE",
              language: "c",
              question: "정수 n개를 입력받아, 평균보다 큰 값의 개수를 출력하세요.\n예시\n입력: 5\n1 2 3 4 5\n출력: 2",
              explanation: "먼저 평균을 구한 뒤, 배열을 다시 순회하며 평균보다 큰 값의 개수를 셉니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "5\n1 2 3 4 5", expected: "2" },
                { stdin: "3\n10 20 30", expected: "1" },
                { stdin: "4\n1 1 1 1", expected: "0", hidden: true },
              ],
            },
            {
              id: "c-u9-l1-c9",
              conceptTags: ["algorithm"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet: "int low = 0, high = 9;\nint mid = (low + high) / 2;\nprintf(\"%d\\n\", mid);",
              explanation: "(0 + 9) / 2 는 정수 나눗셈으로 4가 됩니다 (소수점 버림).",
              options: [
                { id: "a", text: "4", correct: true },
                { id: "b", text: "5", correct: false },
                { id: "c", text: "4.5", correct: false },
                { id: "d", text: "9", correct: false },
              ],
            },
            {
              id: "c-u9-l1-c10",
              conceptTags: ["algorithm", "list", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수 n개를 입력받아 오름차순으로 정렬한 뒤, 공백으로 구분해 출력하세요.\n예시\n입력: 5\n5 3 8 1 2\n출력: 1 2 3 5 8",
              explanation: "선택 정렬이나 버블 정렬로 배열을 오름차순 정렬한 뒤 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "5\n5 3 8 1 2", expected: "1 2 3 5 8" },
                { stdin: "3\n3 1 2", expected: "1 2 3" },
                { stdin: "4\n4 4 4 4", expected: "4 4 4 4", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "c-u10",
      order: 10,
      title: "유닛 10 · 종합 응용",
      description: "배운 개념을 조합해 풀어보는 응용 문제",
      lessons: [
        {
          id: "c-u10-l1",
          title: "종합 문제",
          challenges: [
            {
              id: "c-u10-l1-c1",
              conceptTags: [
                "oop",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "학생의 이름과 성적을 저장하고, 평균 성적을 계산하여 출력하는 프로그램을 작성하세요. 학생의 정보는 구조체를 사용하여 저장하고, 여러 학생의 정보를 배열로 관리합니다.\n예시\n입력: 3\n홍길동 85\n이순신 90\n강감찬 78\n출력: 84.33",
              explanation: "이 프로그램은 구조체를 사용하여 학생의 이름과 성적을 저장하고, 배열을 통해 여러 학생의 정보를 관리합니다. 입력된 성적을 모두 더한 후, 학생 수로 나누어 평균을 계산하고, 소수점 이하 두 자리까지 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "2\n김철수 95\n박영희 85",
                  expected: "90.00"
                },
                {
                  stdin: "4\n최민수 100\n이영희 70\n정수빈 80\n한지민 90",
                  expected: "85.00"
                },
                {
                  stdin: "5\n정우성 60\n이정재 70\n김태리 80\n송중기 90\n전지현 100",
                  expected: "80.00",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u10-l1-c2",
              conceptTags: [
                "function",
                "pointer"
              ],
              type: "WRITE",
              language: "c",
              question: "두 정수를 입력받아 최대 공약수를 구하는 함수를 작성하세요. 이 함수는 포인터를 사용하여 결과를 반환해야 합니다.\n예시\n입력: 36 60\n출력: 12",
              explanation: "이 코드는 두 수의 최대 공약수를 구하기 위해 유클리드 알고리즘을 사용합니다. gcd 함수는 포인터를 통해 결과를 반환하며, main 함수에서 입력을 받고 결과를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "36 60",
                  expected: "12"
                },
                {
                  stdin: "48 18",
                  expected: "6"
                },
                {
                  stdin: "101 10",
                  expected: "1",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u10-l1-c3",
              conceptTags: [
                "loop",
                "list"
              ],
              type: "WRITE",
              language: "c",
              question: "주어진 정수 배열에서 최대값과 최소값을 찾아 출력하는 프로그램을 작성하세요.\n예시\n입력: 5\n3 -1 4 2 -5\n출력: 4 -5",
              explanation: "이 프로그램은 먼저 배열의 크기를 입력받고, 그 다음 배열의 각 요소를 입력받습니다. 반복문을 사용하여 배열의 최대값과 최소값을 찾고, 결과를 출력합니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                {
                  stdin: "3\n1 2 3",
                  expected: "3 1"
                },
                {
                  stdin: "4\n-10 -20 -30 -40",
                  expected: "-10 -40"
                },
                {
                  stdin: "6\n0 0 0 0 0 0",
                  expected: "0 0",
                  hidden: true
                }
              ]
            },
            {
              id: "c-u10-l1-c4",
              conceptTags: ["oop", "list"],
              type: "SELECT",
              language: "c",
              question: "다음의 출력은?",
              codeSnippet:
                'struct Item { char name[10]; int price; };\nstruct Item items[2] = {{"pen", 1000}, {"cup", 3000}};\nprintf("%d\\n", items[1].price);',
              explanation: "items[1] 은 두 번째 원소({\"cup\", 3000})이므로 .price 는 3000입니다.",
              options: [
                { id: "a", text: "3000", correct: true },
                { id: "b", text: "1000", correct: false },
                { id: "c", text: "cup", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u10-l1-c5",
              conceptTags: ["condition"],
              type: "FILL",
              language: "c",
              question: "3과 5 모두의 배수인지 확인하도록 빈칸을 채우세요.",
              explanation: "두 조건을 모두 만족해야 하므로 && 를 사용합니다.",
              fillCode: "if (n % 3 == 0 {{0}} n % 5 == 0) {\n    printf(\"FizzBuzz\\n\");\n}",
              fillAnswers: [["&&"]],
            },
            {
              id: "c-u10-l1-c6",
              conceptTags: ["function", "loop"],
              type: "PARSONS",
              language: "c",
              question: "1부터 n까지 제곱의 합을 구하는 함수를 만들어 호출하는 프로그램이 되도록 순서를 맞추세요.",
              explanation: "1²+2²+3² = 1+4+9 = 14 를 반환합니다.",
              parsonsLines: [
                "int sum_of_squares(int n) {",
                "    int total = 0;",
                "    for (int i = 1; i <= n; i++) {",
                "        total += i * i;",
                "    }",
                "    return total;",
                "}",
                "int main(void) {",
                '    printf("%d\\n", sum_of_squares(3));',
                "    return 0;",
                "}",
              ],
            },
            {
              id: "c-u10-l1-c7",
              conceptTags: ["string", "loop", "debug"],
              type: "BUGFIX",
              language: "c",
              question:
                "'banana' 에서 'a' 의 개수를 세는데 마지막 글자를 놓쳐 3이 아니라 2가 나옵니다. 버그를 고치세요.",
              explanation: "'banana' 는 길이가 6이므로 반복 조건은 i < 6 이어야 마지막 글자까지 검사합니다.",
              starterCode:
                "char s[] = \"banana\";\nint count = 0;\nfor (int i = 0; i < 5; i++) {  // ← 버그\n    if (s[i] == 'a') {\n        count++;\n    }\n}\nprintf(\"%d\\n\", count);\n",
              testCases: [{ expected: "3" }],
            },
            {
              id: "c-u10-l1-c8",
              conceptTags: ["loop", "condition", "io"],
              type: "WRITE",
              language: "c",
              question: "정수 n개를 입력받아, 그 중 3의 배수의 개수를 출력하세요.\n예시\n입력: 5\n3 4 6 7 9\n출력: 3",
              explanation: "각 값을 3으로 나눈 나머지가 0인지 확인하며 개수를 셉니다.",
              starterCode: "#include <stdio.h>\n\nint main(void) {\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
              testCases: [
                { stdin: "5\n3 4 6 7 9", expected: "3" },
                { stdin: "3\n1 2 4", expected: "0" },
                { stdin: "4\n3 3 3 3", expected: "4", hidden: true },
              ],
            },
            {
              id: "c-u10-l1-c9",
              conceptTags: ["pointer", "function"],
              type: "SELECT",
              language: "c",
              question: "다음 프로그램의 출력은?",
              codeSnippet:
                'void increment(int *p) {\n    (*p)++;\n}\n\nint main(void) {\n    int x = 5;\n    increment(&x);\n    printf("%d\\n", x);\n    return 0;\n}',
              explanation: "포인터로 x의 주소를 넘기면 함수 안에서 (*p)++ 로 원본 값을 직접 바꿀 수 있습니다.",
              options: [
                { id: "a", text: "6", correct: true },
                { id: "b", text: "5", correct: false },
                { id: "c", text: "0", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "c-u10-l1-c10",
              conceptTags: ["loop", "condition", "io"],
              type: "WRITE",
              language: "c",
              question:
                "정수 n을 입력받아 1부터 n까지, 3의 배수면 'Fizz', 5의 배수면 'Buzz', 둘 다면 'FizzBuzz', 그 외엔 숫자 자체를 한 줄씩 출력하세요.",
              explanation: "15의 배수(3과 5 모두의 배수) 여부를 먼저 확인한 뒤, 3의 배수, 5의 배수, 그 외 순서로 검사합니다.",
              starterCode:
                '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n',
              testCases: [
                { stdin: "5", expected: "1\n2\nFizz\n4\nBuzz" },
                { stdin: "3", expected: "1\n2\nFizz" },
                {
                  stdin: "15",
                  expected:
                    "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
                  hidden: true,
                },
              ],
            },
          ]
        }
      ]
    },
  ],
};

export const java: Course = {
  id: "java",
  title: "자바 입문",
  emoji: "☕",
  description: "실행하며 배우는 자바 기초",
  units: [
    {
      id: "java-u1",
      order: 1,
      title: "유닛 1 · 자바 첫 걸음",
      description: "출력·변수부터 조건문까지, 그리고 실제 실행 채점",
      lessons: [
        {
          id: "java-u1-l1",
          title: "출력과 변수",
          challenges: [
            {
              id: "java-u1-l1-c1",
              conceptTags: ["output"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력은?",
              codeSnippet: 'System.out.println("코딩고링");',
              explanation:
                "System.out.println() 은 괄호 안의 값을 출력하고 줄을 바꿉니다. 큰따옴표는 출력되지 않습니다.",
              options: [
                { id: "a", text: "코딩고링", correct: true },
                { id: "b", text: '"코딩고링"', correct: false },
                { id: "c", text: "System.out.println(코딩고링)", correct: false },
                { id: "d", text: "컴파일 오류", correct: false },
              ],
            },
            {
              id: "java-u1-l1-c2",
              conceptTags: ["variable", "operator"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력은?",
              codeSnippet: "int x = 5, y = 3;\nSystem.out.println(x * y);",
              explanation: "int 끼리의 곱셈입니다. 5 × 3 = 15.",
              options: [
                { id: "a", text: "15", correct: true },
                { id: "b", text: "8", correct: false },
                { id: "c", text: "53", correct: false },
                { id: "d", text: "x * y", correct: false },
              ],
            },
            {
              id: "java-u1-l1-c3",
              conceptTags: ["variable", "operator"],
              type: "FILL",
              language: "java",
              question: "정수 두 개를 더한 값이 출력되도록 빈칸을 채우세요.",
              explanation: "int 변수 두 개를 더할 때는 + 연산자를 씁니다.",
              fillCode:
                "int a = 4, b = 6;\nSystem.out.println(a {{0}} b);",
              fillAnswers: [["+"]],
            },
            {
              id: "java-u1-l1-c4",
              conceptTags: ["output", "operator"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력은?",
              codeSnippet: 'System.out.println(1 + 2 + "3");',
              explanation:
                "왼쪽부터 계산되어 1+2=3 이 먼저 되고, 그 다음 문자열 \"3\" 과 합쳐져 \"33\" 이 됩니다.",
              options: [
                { id: "a", text: "33", correct: true },
                { id: "b", text: "123", correct: false },
                { id: "c", text: "6", correct: false },
                { id: "d", text: "1+2+3", correct: false },
              ],
            },
            {
              id: "java-u1-l1-c5",
              conceptTags: ["variable"],
              type: "FILL",
              language: "java",
              question: "정수형 변수를 선언하도록 빈칸을 채우세요.",
              explanation: "정수를 저장하는 자료형은 int 입니다.",
              fillCode: "{{0}} age = 20;\nSystem.out.println(age);",
              fillAnswers: [["int"]],
            },
            {
              id: "java-u1-l1-c6",
              conceptTags: ["variable", "operator"],
              type: "PARSONS",
              language: "java",
              question: "두 정수를 선언하고 곱을 출력하는 프로그램이 되도록 순서를 맞추세요.",
              explanation: "변수를 선언한 뒤 계산 결과를 출력합니다.",
              parsonsLines: [
                "public class Main {",
                "    public static void main(String[] args) {",
                "        int a = 3, b = 4;",
                "        System.out.println(a * b);",
                "    }",
                "}",
              ],
            },
            {
              id: "java-u1-l1-c7",
              conceptTags: ["operator", "debug"],
              type: "BUGFIX",
              language: "java",
              question: "두 수의 합이 나와야 하는데 뺄셈 연산자가 쓰였습니다. 버그를 고치세요.",
              explanation: "덧셈은 + 연산자를 사용해야 합니다.",
              starterCode: "int a = 3, b = 4;\nSystem.out.println(a - b);      // ← 버그\n",
              testCases: [{ expected: "7" }],
            },
            {
              id: "java-u1-l1-c8",
              conceptTags: ["variable", "operator", "io"],
              type: "WRITE",
              language: "java",
              question: "정수 두 개를 입력받아 그 곱을 출력하세요.\n예시\n입력: 3 4\n출력: 12",
              explanation: "Scanner 의 nextInt() 로 두 값을 읽어 곱한 뒤 출력합니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "3 4", expected: "12" },
                { stdin: "5 5", expected: "25" },
                { stdin: "0 9", expected: "0", hidden: true },
              ],
            },
            {
              id: "java-u1-l1-c9",
              conceptTags: ["variable", "operator"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력은?",
              codeSnippet: "double result = 7 / 2;\nSystem.out.println(result);",
              explanation:
                "7 / 2 는 정수끼리의 나눗셈이라 먼저 3으로 계산된 뒤 double 로 변환되어 3.0 이 출력됩니다.",
              options: [
                { id: "a", text: "3.0", correct: true },
                { id: "b", text: "3.5", correct: false },
                { id: "c", text: "3", correct: false },
                { id: "d", text: "7.0", correct: false },
              ],
            },
            {
              id: "java-u1-l1-c10",
              conceptTags: ["variable", "io"],
              type: "WRITE",
              language: "java",
              question: "정수와 실수를 각각 입력받아, 그 합을 출력하세요.\n예시\n입력: 3\n2.5\n출력: 5.5",
              explanation: "nextInt() 와 nextDouble() 로 각각 읽어 더한 값을 출력합니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "3\n2.5", expected: "5.5" },
                { stdin: "10\n0.5", expected: "10.5" },
                { stdin: "0\n1.25", expected: "1.25", hidden: true },
              ],
            },
          ],
        },
        {
          id: "java-u1-l2",
          title: "조건문과 실행",
          challenges: [
            {
              id: "java-u1-l2-c1",
              conceptTags: ["condition"],
              type: "SELECT",
              language: "java",
              question: "x = 7 일 때 아래 코드의 출력은?",
              codeSnippet:
                'if (x % 2 == 0) {\n    System.out.println("짝");\n} else {\n    System.out.println("홀");\n}',
              explanation: "7 % 2 는 1 이라 0이 아니므로 else 로 갑니다.",
              options: [
                { id: "a", text: "홀", correct: true },
                { id: "b", text: "짝", correct: false },
                { id: "c", text: "7", correct: false },
                { id: "d", text: "아무것도 출력 안 됨", correct: false },
              ],
            },
            {
              id: "java-u1-l2-c2",
              conceptTags: ["condition", "debug"],
              type: "BUGFIX",
              language: "java",
              question:
                "정수를 입력받아 짝수면 '짝수', 홀수면 '홀수'를 출력해야 하는데 항상 '홀수'만 나옵니다. 고치세요.",
              explanation:
                "나머지를 2로 나눈 값을 0과 비교해야 합니다. = 은 대입, == 이 비교입니다. 여기서는 조건이 뒤집혀 있으니 % 2 == 0 으로 고치면 됩니다.",
              starterCode:
                'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        if (n % 2 == 1) {  // ← 버그\n            System.out.println("짝수");\n        } else {\n            System.out.println("홀수");\n        }\n    }\n}\n',
              testCases: [
                { stdin: "4", expected: "짝수" },
                { stdin: "7", expected: "홀수" },
                { stdin: "10", expected: "짝수", hidden: true },
              ],
            },
            {
              id: "java-u1-l2-c3",
              conceptTags: ["output", "io"],
              type: "WRITE",
              language: "java",
              question:
                "정수 두 개를 입력받아(공백으로 구분) 그 합을 출력하는 프로그램을 완성하세요.",
              explanation:
                "Scanner 의 nextInt() 로 두 수를 읽고, System.out.println() 으로 합을 출력하면 됩니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "3 5", expected: "8" },
                { stdin: "10 20", expected: "30" },
                { stdin: "-4 4", expected: "0", hidden: true },
              ],
            },
            {
              id: "java-u1-l2-c4",
              conceptTags: ["condition"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력은?",
              codeSnippet:
                'int score = 85;\nif (score >= 90) {\n    System.out.println("A");\n} else if (score >= 80) {\n    System.out.println("B");\n} else {\n    System.out.println("C");\n}',
              explanation: "85는 90 이상이 아니지만 80 이상이므로 else if 에서 'B' 가 출력됩니다.",
              options: [
                { id: "a", text: "B", correct: true },
                { id: "b", text: "A", correct: false },
                { id: "c", text: "C", correct: false },
                { id: "d", text: "아무것도 출력 안 됨", correct: false },
              ],
            },
            {
              id: "java-u1-l2-c5",
              conceptTags: ["condition", "operator"],
              type: "FILL",
              language: "java",
              question: "n이 10 이상일 때 '통과' 가 출력되도록 빈칸을 채우세요.",
              explanation: "'이상' 은 크거나 같다는 뜻이므로 >= 를 사용합니다.",
              fillCode: "int n = 10;\nif (n {{0}} 10) {\n    System.out.println(\"통과\");\n}",
              fillAnswers: [[">="]],
            },
            {
              id: "java-u1-l2-c6",
              conceptTags: ["condition"],
              type: "PARSONS",
              language: "java",
              question:
                "점수에 따라 A/B/C 학점을 출력하도록 순서를 맞추세요 (90 이상 A, 80 이상 B, 나머지 C).",
              explanation: "조건은 위에서부터 순서대로 검사되며, 처음 참인 조건의 블록만 실행됩니다.",
              parsonsLines: [
                "int score = 75;",
                "if (score >= 90) {",
                '    System.out.println("A");',
                "} else if (score >= 80) {",
                '    System.out.println("B");',
                "} else {",
                '    System.out.println("C");',
                "}",
              ],
            },
            {
              id: "java-u1-l2-c7",
              conceptTags: ["condition", "debug"],
              type: "BUGFIX",
              language: "java",
              question:
                "점수가 60~100 범위일 때만 '합격' 이 출력되어야 하는데, 범위를 벗어나도 항상 합격이 나옵니다. 버그를 고치세요.",
              explanation: "두 조건을 모두 만족해야 하므로 || 대신 && 를 사용해야 합니다.",
              starterCode:
                'int score = 150;\nif (score >= 60 || score <= 100) {  // ← 버그\n    System.out.println("합격");\n} else {\n    System.out.println("불합격");\n}\n',
              testCases: [{ expected: "불합격" }],
            },
            {
              id: "java-u1-l2-c8",
              conceptTags: ["condition", "io"],
              type: "WRITE",
              language: "java",
              question: "정수를 입력받아 양수면 '양수', 음수면 '음수', 0이면 '0' 을 출력하세요.",
              explanation: "n > 0, n < 0, 그 외(0) 세 경우로 나누어 판단합니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "5", expected: "양수" },
                { stdin: "-3", expected: "음수" },
                { stdin: "0", expected: "0", hidden: true },
              ],
            },
            {
              id: "java-u1-l2-c9",
              conceptTags: ["condition"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력은?",
              codeSnippet:
                'int x = 5, y = 10;\nif (x > 0 && y > 0) {\n    System.out.println("둘 다 양수");\n} else {\n    System.out.println("아니오");\n}',
              explanation: "x와 y 모두 0보다 크므로 && 조건이 참이 되어 '둘 다 양수' 가 출력됩니다.",
              options: [
                { id: "a", text: "둘 다 양수", correct: true },
                { id: "b", text: "아니오", correct: false },
                { id: "c", text: "5", correct: false },
                { id: "d", text: "컴파일 오류", correct: false },
              ],
            },
            {
              id: "java-u1-l2-c10",
              conceptTags: ["condition", "io"],
              type: "WRITE",
              language: "java",
              question: "세 정수를 입력받아 그 중 가장 큰 값을 출력하세요.",
              explanation: "Math.max(a, Math.max(b, c)) 를 쓰거나 if/else 로 직접 비교해도 됩니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "3 7 5", expected: "7" },
                { stdin: "10 2 8", expected: "10" },
                { stdin: "1 1 1", expected: "1", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "java-u2",
      order: 2,
      title: "유닛 2 · 반복문과 배열",
      description: "반복문으로 값을 여러 번 처리하고, 배열에 담아 관리하기",
      lessons: [
        {
          id: "java-u2-l1",
          title: "반복문",
          challenges: [
            {
              id: "java-u2-l1-c1",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "java",
              question: "다음 코드에서 마지막으로 출력되는 값은?",
              codeSnippet:
                "for (int i = 1; i <= 3; i++) {\n    System.out.println(i * i);\n}",
              explanation: "i 가 1, 2, 3 일 때 각각 1, 4, 9 를 출력하고 멈춥니다. 마지막은 9.",
              options: [
                { id: "a", text: "9", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "6", correct: false },
                { id: "d", text: "1", correct: false },
              ],
            },
            {
              id: "java-u2-l1-c2",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "java",
              question:
                "구구단처럼 n단을 1부터 n까지 출력해야 하는데, 마지막 줄(n x n)이 빠집니다. 버그를 고치세요.",
              explanation: "반복 조건이 i < n 이면 n 자신이 빠집니다. i <= n 이어야 합니다.",
              starterCode:
                'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 1; i < n; i++) {  // ← 버그\n            System.out.println(n + " x " + i + " = " + (n * i));\n        }\n    }\n}\n',
              testCases: [{ stdin: "3", expected: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9" }],
            },
            {
              id: "java-u2-l1-c3",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "java",
              question: "정수 n을 입력받아 1부터 n까지의 합을 출력하세요.",
              explanation: "반복문을 돌며 sum 에 i 를 계속 더하면 됩니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "5", expected: "15" },
                { stdin: "10", expected: "55" },
                { stdin: "1", expected: "1", hidden: true },
              ],
            },
            {
              id: "java-u2-l1-c4",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력 줄 수는 몇 줄인가요?",
              codeSnippet: "int i = 0;\nwhile (i < 3) {\n    System.out.println(i);\n    i++;\n}",
              explanation: "i 가 0,1,2 일 때 조건 i<3 이 참이라 3번 반복하며 출력합니다.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "2", correct: false },
                { id: "c", text: "4", correct: false },
                { id: "d", text: "무한 반복", correct: false },
              ],
            },
            {
              id: "java-u2-l1-c5",
              conceptTags: ["loop"],
              type: "FILL",
              language: "java",
              question: "1부터 10까지 출력되도록 빈칸을 채우세요.",
              explanation: "i <= 10 이면 1부터 10까지 반복합니다.",
              fillCode: "for (int i = 1; i <= {{0}}; i++) {\n    System.out.println(i);\n}",
              fillAnswers: [["10"]],
            },
            {
              id: "java-u2-l1-c6",
              conceptTags: ["loop"],
              type: "PARSONS",
              language: "java",
              question: "5부터 1까지 거꾸로 출력하도록 순서를 맞추세요.",
              explanation: "i-- 로 감소시키며 5부터 1까지 출력합니다.",
              parsonsLines: ["for (int i = 5; i >= 1; i--) {", "    System.out.println(i);", "}"],
            },
            {
              id: "java-u2-l1-c7",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "java",
              question: "1부터 5까지 출력해야 하는데 5가 빠집니다. 버그를 고치세요.",
              explanation: "i < 5 는 5를 포함하지 않습니다. i <= 5 로 고쳐야 5까지 출력됩니다.",
              starterCode: "int i = 1;\nwhile (i < 5) {  // ← 버그\n    System.out.println(i);\n    i++;\n}\n",
              testCases: [{ expected: "1\n2\n3\n4\n5" }],
            },
            {
              id: "java-u2-l1-c8",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "java",
              question: "정수 n을 입력받아 1부터 n까지 한 줄에 하나씩 출력하세요.",
              explanation: "for (int i = 1; i <= n; i++) 로 반복하며 각 값을 출력합니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "3", expected: "1\n2\n3" },
                { stdin: "1", expected: "1" },
                { stdin: "5", expected: "1\n2\n3\n4\n5", hidden: true },
              ],
            },
            {
              id: "java-u2-l1-c9",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "java",
              question: "다음 코드가 마지막으로 출력하는 값은?",
              codeSnippet:
                "for (int i = 0; i < 10; i++) {\n    if (i == 3) {\n        break;\n    }\n    System.out.println(i);\n}",
              explanation: "i가 3이 되면 break로 반복이 즉시 멈추므로, 그 직전인 2까지만 출력됩니다.",
              options: [
                { id: "a", text: "2", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "9", correct: false },
                { id: "d", text: "아무것도 출력 안 됨", correct: false },
              ],
            },
            {
              id: "java-u2-l1-c10",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "java",
              question: "정수 n을 입력받아 1부터 n까지의 짝수의 합을 출력하세요.",
              explanation: "반복문을 돌며 2로 나눈 나머지가 0인 값만 더합니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "10", expected: "30" },
                { stdin: "5", expected: "6" },
                { stdin: "1", expected: "0", hidden: true },
              ],
            },
          ],
        },
        {
          id: "java-u2-l2",
          title: "배열",
          challenges: [
            {
              id: "java-u2-l2-c1",
              conceptTags: ["list"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력은?",
              codeSnippet: "int[] arr = {3, 6, 9};\nSystem.out.println(arr.length);",
              explanation: ".length 는 배열의 원소 개수입니다. 3개이므로 3.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "9", correct: false },
                { id: "c", text: "2", correct: false },
                { id: "d", text: "{3, 6, 9}", correct: false },
              ],
            },
            {
              id: "java-u2-l2-c2",
              conceptTags: ["list"],
              type: "FILL",
              language: "java",
              question: "배열의 두 번째 원소(인덱스 1)를 출력하도록 빈칸을 채우세요.",
              explanation: "인덱스는 0부터 시작하므로 두 번째 원소는 인덱스 1입니다.",
              fillCode: "int[] arr = {10, 20, 30};\nSystem.out.println(arr[{{0}}]);",
              fillAnswers: [["1"]],
            },
            {
              id: "java-u2-l2-c3",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "java",
              question:
                "정수 3개를 입력받아(공백으로 구분) 배열에 저장한 뒤, 그 중 최댓값을 출력하세요.",
              explanation:
                "배열에 값을 채운 뒤, 첫 번째 값을 기준으로 더 큰 값이 나올 때마다 최댓값을 갱신하면 됩니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int[] arr = new int[3];\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "3 7 5", expected: "7" },
                { stdin: "1 2 3", expected: "3" },
                { stdin: "9 2 4", expected: "9", hidden: true },
              ],
            },
            {
              id: "java-u2-l2-c4",
              conceptTags: ["list"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력은?",
              codeSnippet: "int[] arr = new int[5];\nSystem.out.println(arr[0]);",
              explanation: "Java 에서 int 배열을 new 로 생성하면 모든 원소가 0으로 초기화됩니다.",
              options: [
                { id: "a", text: "0", correct: true },
                { id: "b", text: "null", correct: false },
                { id: "c", text: "쓰레기 값", correct: false },
                { id: "d", text: "컴파일 오류", correct: false },
              ],
            },
            {
              id: "java-u2-l2-c5",
              conceptTags: ["list"],
              type: "FILL",
              language: "java",
              question: "정수 5개를 담을 수 있도록 배열 크기를 채우세요.",
              explanation: "new int[] 의 대괄호 안 숫자가 배열의 크기입니다.",
              fillCode: "int[] arr = new int[{{0}}];",
              fillAnswers: [["5"]],
            },
            {
              id: "java-u2-l2-c6",
              conceptTags: ["list", "loop"],
              type: "PARSONS",
              language: "java",
              question: "배열의 모든 원소를 더해 합계를 출력하도록 순서를 맞추세요.",
              explanation: "arr.length 로 배열 크기만큼 반복하며 각 원소를 더합니다.",
              parsonsLines: [
                "int[] arr = {10, 20, 30};",
                "int sum = 0;",
                "for (int i = 0; i < arr.length; i++) {",
                "    sum += arr[i];",
                "}",
                "System.out.println(sum);",
              ],
            },
            {
              id: "java-u2-l2-c7",
              conceptTags: ["list", "debug"],
              type: "BUGFIX",
              language: "java",
              question: "배열의 합을 구하는데 인덱스 범위를 벗어나 오류가 납니다. 버그를 고치세요.",
              explanation: "배열 크기가 3이면 유효한 인덱스는 0~2 입니다. i < arr.length 로 고쳐야 합니다.",
              starterCode:
                "int[] arr = {1, 2, 3};\nint sum = 0;\nfor (int i = 0; i <= arr.length; i++) {  // ← 버그\n    sum += arr[i];\n}\nSystem.out.println(sum);\n",
              testCases: [{ expected: "6" }],
            },
            {
              id: "java-u2-l2-c8",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "java",
              question:
                "정수 5개를 입력받아 배열에 저장한 뒤, 그 중 최댓값을 출력하세요.\n예시\n입력: 3 7 2 9 4\n출력: 9",
              explanation: "배열을 순회하며 지금까지의 최댓값과 비교해 갱신합니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int[] arr = new int[5];\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "3 7 2 9 4", expected: "9" },
                { stdin: "10 20 5 1 8", expected: "20" },
                { stdin: "1 1 1 1 1", expected: "1", hidden: true },
              ],
            },
            {
              id: "java-u2-l2-c9",
              conceptTags: ["list"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력은?",
              codeSnippet: "int[] a = {1, 2, 3};\nint[] b = a;\nb[0] = 99;\nSystem.out.println(a[0]);",
              explanation:
                "배열은 객체라서 b = a 는 같은 배열을 가리킵니다. b를 바꾸면 a도 함께 바뀌어 99가 출력됩니다.",
              options: [
                { id: "a", text: "99", correct: true },
                { id: "b", text: "1", correct: false },
                { id: "c", text: "0", correct: false },
                { id: "d", text: "컴파일 오류", correct: false },
              ],
            },
            {
              id: "java-u2-l2-c10",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "java",
              question:
                "정수 5개를 입력받아 배열에 저장한 뒤, 역순으로 한 줄에 하나씩 출력하세요.\n예시\n입력: 1 2 3 4 5\n출력: 5\n4\n3\n2\n1",
              explanation: "인덱스를 마지막(4)부터 0까지 거꾸로 돌며 출력합니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int[] arr = new int[5];\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "1 2 3 4 5", expected: "5\n4\n3\n2\n1" },
                { stdin: "10 20 30 40 50", expected: "50\n40\n30\n20\n10" },
                { stdin: "0 0 0 0 1", expected: "1\n0\n0\n0\n0", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "java-u3",
      order: 3,
      title: "유닛 3 · 문자열",
      description: "String 메서드로 문자열 다루기",
      lessons: [
        {
          id: "java-u3-l1",
          title: "String 메서드",
          challenges: [
            {
              id: "java-u3-l1-c1",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 문자열의 길이를 출력하고, 문자열의 첫 번째 문자를 출력하는 프로그램을 작성하세요.\n예시\n입력: Hello, World!\n출력: 13\nH",
              explanation: "이 프로그램은 사용자가 입력한 문자열의 길이를 계산하고, 첫 번째 문자를 추출하여 출력합니다. length() 메서드는 문자열의 길이를 반환하고, charAt(0) 메서드는 문자열의 첫 번째 문자를 반환합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "CodingGoring",
                  expected: "12\nC"
                },
                {
                  stdin: "Java Programming",
                  expected: "16\nJ"
                },
                {
                  stdin: "12345",
                  expected: "5\n1",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u3-l1-c3",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 문자열의 대문자는 소문자로, 소문자는 대문자로 변환하는 프로그램을 작성하세요.\n예시\n입력: HelloWorld\n출력: hELLOWORLD",
              explanation: "이 프로그램은 입력된 문자열을 하나씩 검사하여 대문자는 소문자로, 소문자는 대문자로 변환합니다. 변환된 문자는 StringBuilder를 사용하여 최종 결과 문자열을 만듭니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "JavaProgramming",
                  expected: "jAVApROGRAMMING"
                },
                {
                  stdin: "CodingGoring",
                  expected: "cODINGgORING"
                },
                {
                  stdin: "OpenAI",
                  expected: "oPENai",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u3-l1-c4",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 문자열의 대문자를 소문자로, 소문자를 대문자로 변환하여 출력하는 프로그램을 작성하세요.\n예시\n입력: Hello World\n출력: hELLO wORLD",
              explanation: "이 프로그램은 입력된 문자열을 문자 단위로 순회하며, 각 문자가 대문자인지 소문자인지를 확인합니다. 대문자일 경우 소문자로 변환하고, 소문자일 경우 대문자로 변환하여 결과 문자열을 생성합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "Coding is Fun",
                  expected: "cODING IS fUN"
                },
                {
                  stdin: "JAVA Programming",
                  expected: "java pROGRAMMING"
                },
                {
                  stdin: "OpenAI ChatGPT",
                  expected: "oPENai cHATgpt",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u3-l1-c5",
              conceptTags: ["string"],
              type: "SELECT",
              language: "java",
              question: "다음의 출력은?",
              codeSnippet: 'String s = "CodeRun";\nSystem.out.println(s.substring(0, 4));',
              explanation: "substring(0, 4) 는 인덱스 0부터 3까지(4는 포함 안 함)를 가져옵니다. 'Code'.",
              options: [
                { id: "a", text: "Code", correct: true },
                { id: "b", text: "Run", correct: false },
                { id: "c", text: "CodeR", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "java-u3-l1-c6",
              conceptTags: ["string"],
              type: "FILL",
              language: "java",
              question: "두 문자열의 내용이 같은지 비교하도록 빈칸을 채우세요.",
              explanation: "문자열 내용 비교에는 == 대신 equals() 를 사용해야 합니다.",
              fillCode: 'String a = "hi";\nString b = "hi";\nSystem.out.println(a.{{0}}(b));',
              fillAnswers: [["equals"]],
            },
            {
              id: "java-u3-l1-c7",
              conceptTags: ["string"],
              type: "PARSONS",
              language: "java",
              question: "성과 이름을 합쳐 '홍길동' 을 출력하는 프로그램이 되도록 순서를 맞추세요.",
              explanation: "문자열을 + 로 이어 붙인 뒤 출력합니다.",
              parsonsLines: [
                'String last = "홍";',
                'String first = "길동";',
                "String full = last + first;",
                "System.out.println(full);",
              ],
            },
            {
              id: "java-u3-l1-c8",
              conceptTags: ["string", "debug"],
              type: "BUGFIX",
              language: "java",
              question: "문자열 내용이 같은데도 '다름' 이 출력됩니다. 버그를 고치세요.",
              explanation: "== 는 객체 참조를 비교합니다. 내용을 비교하려면 a.equals(b) 를 사용해야 합니다.",
              starterCode:
                'String a = new String("hi");\nString b = new String("hi");\nif (a == b) {  // ← 버그\n    System.out.println("같음");\n} else {\n    System.out.println("다름");\n}\n',
              testCases: [{ expected: "같음" }],
            },
            {
              id: "java-u3-l1-c9",
              conceptTags: ["string", "io"],
              type: "WRITE",
              language: "java",
              question:
                "문자열과 찾을 문자를 입력받아, 그 문자가 처음 나오는 인덱스를 출력하세요. 없으면 -1을 출력하세요.\n예시\n입력: hello\nl\n출력: 2",
              explanation: "String 의 indexOf() 메서드로 처음 등장하는 위치를 바로 구할 수 있습니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "hello\nl", expected: "2" },
                { stdin: "world\nz", expected: "-1" },
                { stdin: "banana\na", expected: "1", hidden: true },
              ],
            },
            {
              id: "java-u3-l1-c10",
              conceptTags: ["string"],
              type: "SELECT",
              language: "java",
              question: "다음의 출력은?",
              codeSnippet: 'String s = "a,b,c";\nString[] parts = s.split(",");\nSystem.out.println(parts.length);',
              explanation: "split(\",\") 는 콤마를 기준으로 문자열을 나눠 배열로 만듭니다. 'a','b','c' 3개.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "5", correct: false },
                { id: "c", text: "1", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "java-u3-l1-c11",
              conceptTags: ["string", "io"],
              type: "WRITE",
              language: "java",
              question: "문자열을 입력받아 거꾸로 뒤집어 출력하세요.\n예시\n입력: hello\n출력: olleh",
              explanation: "new StringBuilder(s).reverse().toString() 을 사용하거나 직접 뒤에서부터 순회해도 됩니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "hello", expected: "olleh" },
                { stdin: "code", expected: "edoc" },
                { stdin: "a", expected: "a", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "java-u4",
      order: 4,
      title: "유닛 4 · 메서드",
      description: "코드를 메서드로 나눠 재사용하기",
      lessons: [
        {
          id: "java-u4-l1",
          title: "메서드 정의",
          challenges: [
            {
              id: "java-u4-l1-c1",
              conceptTags: [
                "function"
              ],
              type: "WRITE",
              language: "java",
              question: "두 개의 정수를 입력받아 그 중에서 최댓값을 반환하는 메서드를 정의하세요.\n예시\n입력: 5\n10\n출력: 10",
              explanation: "이 문제는 두 정수를 입력받고, 그 중에서 큰 값을 반환하는 메서드를 만드는 것입니다. 조건문을 사용하여 두 수를 비교하고 최댓값을 결정합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "3\n7",
                  expected: "7"
                },
                {
                  stdin: "-5\n-3",
                  expected: "-3"
                },
                {
                  stdin: "0\n0",
                  expected: "0",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u4-l1-c2",
              conceptTags: [
                "function"
              ],
              type: "WRITE",
              language: "java",
              question: "정수가 소수인지 판별하는 메서드를 정의하세요. 소수란 1과 자기 자신만으로 나누어 떨어지는 1보다 큰 자연수입니다.\n예시\n입력: 7\n출력: YES",
              explanation: "이 코드는 주어진 정수 N이 소수인지 확인하는 메서드를 정의합니다. 1보다 큰 정수에 대해서만 소수 판별을 수행하며, 2부터 N의 제곱근까지 나누어 떨어지는 수가 있는지를 확인하여 소수를 판별합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "1",
                  expected: "NO"
                },
                {
                  stdin: "10",
                  expected: "NO"
                },
                {
                  stdin: "13",
                  expected: "YES",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u4-l1-c3",
              conceptTags: [
                "function"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 길이를 사용하여 사각형과 원의 면적을 계산하는 메서드를 작성하세요. 두 개의 메서드를 오버로딩하여 같은 이름을 사용하되, 매개변수의 수와 타입이 다르게 하세요.\n예시\n입력: 5\n3.0\n출력: 25\n28.27",
              explanation: "이 문제에서는 메서드 오버로딩을 사용하여 같은 이름의 메서드를 정의하고, 매개변수의 타입에 따라 다른 기능을 수행하게 합니다. 'calculateArea' 메서드는 정수 매개변수를 받을 때 사각형의 면적을 계산하고, 실수 매개변수를 받을 때 원의 면적을 계산합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "10\n5.0",
                  expected: "100\n78.54"
                },
                {
                  stdin: "7\n2.5",
                  expected: "49\n19.63"
                },
                {
                  stdin: "15\n4.0",
                  expected: "225\n50.27",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u4-l1-c4",
              conceptTags: ["function"],
              type: "SELECT",
              language: "java",
              question: "다음 프로그램의 출력은?",
              codeSnippet:
                "static int add(int a, int b) {\n    return a + b;\n}\n\npublic static void main(String[] args) {\n    System.out.println(add(3, 4));\n}",
              explanation: "add(3, 4) 는 3+4 를 계산해 7을 반환합니다.",
              options: [
                { id: "a", text: "7", correct: true },
                { id: "b", text: "34", correct: false },
                { id: "c", text: "a + b", correct: false },
                { id: "d", text: "컴파일 오류", correct: false },
              ],
            },
            {
              id: "java-u4-l1-c5",
              conceptTags: ["function"],
              type: "FILL",
              language: "java",
              question: "정수를 반환하는 메서드가 되도록 반환 타입을 채우세요.",
              explanation: "정수를 반환하는 메서드는 반환 타입을 int 로 선언합니다.",
              fillCode: "static {{0}} square(int n) {\n    return n * n;\n}",
              fillAnswers: [["int"]],
            },
            {
              id: "java-u4-l1-c6",
              conceptTags: ["function"],
              type: "PARSONS",
              language: "java",
              question: "두 수를 곱해 반환하는 메서드를 정의하고 호출하는 프로그램이 되도록 순서를 맞추세요.",
              explanation: "메서드를 먼저 정의한 뒤, main 에서 호출해 결과를 출력합니다.",
              parsonsLines: [
                "static int multiply(int a, int b) {",
                "    return a * b;",
                "}",
                "public static void main(String[] args) {",
                "    System.out.println(multiply(3, 4));",
                "}",
              ],
            },
            {
              id: "java-u4-l1-c7",
              conceptTags: ["function", "debug"],
              type: "BUGFIX",
              language: "java",
              question: "10에서 3을 뺀 값이 나와야 하는데 인자 순서가 바뀌어 음수가 나옵니다. 버그를 고치세요.",
              explanation: "subtract(a, b) 는 a - b 를 계산하므로 subtract(x, y) 순서로 호출해야 합니다.",
              starterCode:
                "static int subtract(int a, int b) {\n    return a - b;\n}\n\npublic static void main(String[] args) {\n    int x = 10, y = 3;\n    System.out.println(subtract(y, x));      // ← 버그\n}\n",
              testCases: [{ expected: "7" }],
            },
            {
              id: "java-u4-l1-c8",
              conceptTags: ["function", "condition", "io"],
              type: "WRITE",
              language: "java",
              question:
                "연도를 입력받아 윤년이면 'Yes', 아니면 'No' 를 출력하는 메서드 isLeap(int year) 를 작성해 사용하세요. (4의 배수이면서 100의 배수가 아니거나, 400의 배수이면 윤년)",
              explanation: "(year%4==0 && year%100!=0) || year%400==0 조건으로 판별합니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "2024", expected: "Yes" },
                { stdin: "1900", expected: "No" },
                { stdin: "2000", expected: "Yes", hidden: true },
              ],
            },
            {
              id: "java-u4-l1-c9",
              conceptTags: ["function"],
              type: "SELECT",
              language: "java",
              question: "다음 프로그램의 출력은?",
              codeSnippet:
                'static void greet() {\n    System.out.println("Hi");\n}\n\npublic static void main(String[] args) {\n    greet();\n}',
              explanation: "void 메서드는 값을 반환하지 않고 동작만 수행합니다. greet() 호출로 'Hi' 가 출력됩니다.",
              options: [
                { id: "a", text: "Hi", correct: true },
                { id: "b", text: "0", correct: false },
                { id: "c", text: "아무것도 출력 안 됨", correct: false },
                { id: "d", text: "컴파일 오류", correct: false },
              ],
            },
            {
              id: "java-u4-l1-c10",
              conceptTags: ["function", "io"],
              type: "WRITE",
              language: "java",
              question:
                "정수를 입력받아 그 자릿수를 반환하는 메서드 countDigits(int n) 를 작성해 사용하세요. (n은 0 이상의 정수)\n예시\n입력: 12345\n출력: 5",
              explanation: "n을 10으로 나누며 0이 될 때까지 반복한 횟수를 세면 자릿수가 됩니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "12345", expected: "5" },
                { stdin: "7", expected: "1" },
                { stdin: "1000", expected: "4", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "java-u5",
      order: 5,
      title: "유닛 5 · 클래스와 객체",
      description: "데이터와 동작을 객체로 묶어보기",
      lessons: [
        {
          id: "java-u5-l1",
          title: "클래스 기초",
          challenges: [
            {
              id: "java-u5-l1-c1",
              conceptTags: [
                "oop"
              ],
              type: "WRITE",
              language: "java",
              question: "학생 정보를 저장하는 클래스를 정의하고, 생성자를 사용하여 인스턴스 필드를 초기화한 후, 해당 정보를 출력하세요.\n예시\n입력: 홍길동\n20\n출력: 이름: 홍길동, 나이: 20",
              explanation: "이 문제는 학생 정보를 저장하는 클래스를 만들고, 생성자를 통해 이름과 나이를 초기화한 후, 이를 출력하는 간단한 프로그램을 작성하는 것입니다. Scanner 클래스를 사용하여 입력을 받고, Student 클래스의 display 메서드를 통해 정보를 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "김철수\n25",
                  expected: "이름: 김철수, 나이: 25"
                },
                {
                  stdin: "이영희\n30",
                  expected: "이름: 이영희, 나이: 30"
                },
                {
                  stdin: "박지민\n22",
                  expected: "이름: 박지민, 나이: 22",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u5-l1-c2",
              conceptTags: [
                "oop"
              ],
              type: "WRITE",
              language: "java",
              question: "사각형의 너비와 높이를 입력받아 면적을 계산하는 클래스를 작성하세요. 이 클래스에는 면적을 계산하는 메서드가 포함되어야 합니다.\n예시\n입력: 5 10\n출력: 50",
              explanation: "이 문제는 사각형의 면적을 계산하는 클래스를 작성하는 것입니다. 사용자는 너비와 높이를 입력하고, 프로그램은 이 값을 이용해 면적을 계산하여 출력합니다. Rectangle 클래스는 너비와 높이를 필드로 가지고 있으며, area() 메서드를 통해 면적을 계산합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "3 4",
                  expected: "12"
                },
                {
                  stdin: "7 2",
                  expected: "14"
                },
                {
                  stdin: "10 10",
                  expected: "100",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u5-l1-c3",
              conceptTags: [
                "oop"
              ],
              type: "WRITE",
              language: "java",
              question: "사람의 이름과 나이를 초기화하는 생성자를 가진 클래스를 작성하고, 이를 통해 객체를 생성하여 정보를 출력하는 프로그램을 작성하세요.\n예시\n입력: 홍길동\n25\n출력: 이름: 홍길동, 나이: 25",
              explanation: "이 프로그램은 Person 클래스를 정의하고, 생성자를 통해 이름과 나이를 초기화합니다. main 메서드에서 사용자로부터 입력을 받아 객체를 생성하고, displayInfo 메서드를 호출하여 정보를 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "김철수\n30",
                  expected: "이름: 김철수, 나이: 30"
                },
                {
                  stdin: "이영희\n45",
                  expected: "이름: 이영희, 나이: 45"
                },
                {
                  stdin: "박지민\n20",
                  expected: "이름: 박지민, 나이: 20",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u5-l1-c4",
              conceptTags: ["oop"],
              type: "SELECT",
              language: "java",
              question: "다음의 출력은?",
              codeSnippet:
                'class Dog {\n    String name;\n}\n\nDog d = new Dog();\nd.name = "바둑이";\nSystem.out.println(d.name);',
              explanation: "객체의 필드는 점(.) 연산자로 접근합니다. d.name 에 저장한 값을 그대로 가져옵니다.",
              options: [
                { id: "a", text: "바둑이", correct: true },
                { id: "b", text: "name", correct: false },
                { id: "c", text: "Dog", correct: false },
                { id: "d", text: "컴파일 오류", correct: false },
              ],
            },
            {
              id: "java-u5-l1-c5",
              conceptTags: ["oop"],
              type: "FILL",
              language: "java",
              question: "생성자에서 인스턴스 필드에 값을 저장하도록 빈칸을 채우세요.",
              explanation: "인스턴스 자신을 가리키는 키워드는 this 입니다.",
              fillCode: "class Cat {\n    int age;\n    Cat(int age) {\n        {{0}}.age = age;\n    }\n}",
              fillAnswers: [["this"]],
            },
            {
              id: "java-u5-l1-c6",
              conceptTags: ["oop"],
              type: "PARSONS",
              language: "java",
              question: "원의 넓이를 계산하는 메서드를 가진 클래스를 만들어 사용하도록 순서를 맞추세요.",
              explanation: "클래스 안에 메서드를 정의하고, 객체를 만든 뒤 메서드를 호출합니다.",
              parsonsLines: [
                "class Circle {",
                "    double r;",
                "    Circle(double r) { this.r = r; }",
                "    double area() { return 3.14 * r * r; }",
                "}",
                "Circle c = new Circle(2);",
                "System.out.println(c.area());",
              ],
            },
            {
              id: "java-u5-l1-c7",
              conceptTags: ["oop", "debug"],
              type: "BUGFIX",
              language: "java",
              question: "생성자에서 값을 저장했는데 필드가 0으로 나옵니다. 버그를 고치세요.",
              explanation:
                "size = size; 는 매개변수를 자기 자신에게 대입할 뿐입니다. this.size = size; 로 필드를 가리켜야 합니다.",
              starterCode:
                "class Box {\n    int size;\n    Box(int size) {\n        size = size;      // ← 버그\n    }\n}\n\npublic static void main(String[] args) {\n    Box b = new Box(5);\n    System.out.println(b.size);\n}\n",
              testCases: [{ expected: "5" }],
            },
            {
              id: "java-u5-l1-c8",
              conceptTags: ["oop", "io"],
              type: "WRITE",
              language: "java",
              question:
                "잔액(balance)을 필드로 갖는 Wallet 클래스를 작성하세요. 정수를 입력받아 초기 잔액으로 설정하고, add(금액) 메서드로 금액을 더한 뒤 최종 잔액을 출력하세요.\n예시\n입력: 1000\n500\n출력: 1500",
              explanation: "add 메서드 안에서 this.balance 에 금액을 더하면 됩니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "1000\n500", expected: "1500" },
                { stdin: "0\n100", expected: "100" },
                { stdin: "2000\n-500", expected: "1500", hidden: true },
              ],
            },
            {
              id: "java-u5-l1-c9",
              conceptTags: ["oop"],
              type: "SELECT",
              language: "java",
              question: "다음의 출력은?",
              codeSnippet:
                'class Box {\n    int size;\n    Box(int size) { this.size = size; }\n}\n\nBox a = new Box(3);\nBox b = new Box(5);\nSystem.out.println(a.size + " " + b.size);',
              explanation: "각 인스턴스는 자신만의 size 값을 가집니다. a.size 는 3, b.size 는 5.",
              options: [
                { id: "a", text: "3 5", correct: true },
                { id: "b", text: "5 5", correct: false },
                { id: "c", text: "3 3", correct: false },
                { id: "d", text: "컴파일 오류", correct: false },
              ],
            },
            {
              id: "java-u5-l1-c10",
              conceptTags: ["oop", "io"],
              type: "WRITE",
              language: "java",
              question:
                "가로(width)와 세로(height)를 필드로 갖는 Rectangle 클래스를 작성하세요. isSquare() 메서드는 가로와 세로가 같으면 'True', 다르면 'False' 를 반환합니다. 가로와 세로를 입력받아 결과를 출력하세요.",
              explanation: "isSquare 메서드에서 this.width == this.height 를 반환하면 됩니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "4 4", expected: "True" },
                { stdin: "3 5", expected: "False" },
                { stdin: "7 7", expected: "True", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "java-u6",
      order: 6,
      title: "유닛 6 · 2차원 배열",
      description: "행과 열로 이루어진 배열 다루기",
      lessons: [
        {
          id: "java-u6-l1",
          title: "2차원 배열 기초",
          challenges: [
            {
              id: "java-u6-l1-c1",
              conceptTags: [
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "사용자가 입력한 행과 열의 인덱스를 기반으로 2차원 배열에서 값을 출력하는 프로그램을 작성하세요.\n예시\n입력: 3 3\n1 2 3\n4 5 6\n7 8 9\n1 1\n출력: 5",
              explanation: "이 프로그램은 사용자로부터 2차원 배열의 크기와 요소를 입력받고, 특정 인덱스에 해당하는 값을 출력합니다. 배열을 생성하고, 중첩된 반복문을 사용하여 값을 입력받고, 마지막으로 인덱스를 통해 해당 값을 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "2 2\n10 20\n30 40\n0 1",
                  expected: "20"
                },
                {
                  stdin: "3 3\n1 1 1\n2 2 2\n3 3 3\n2 0",
                  expected: "3"
                },
                {
                  stdin: "4 4\n5 6 7 8\n9 10 11 12\n13 14 15 16\n17 18 19 20\n3 3",
                  expected: "20",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u6-l1-c2",
              conceptTags: [
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 2차원 배열의 모든 원소를 합산하는 프로그램을 작성하세요.\n예시\n입력: 2 3\n1 2 3\n4 5 6\n출력: 21",
              explanation: "이 문제는 2차원 배열의 모든 원소를 합산하는 간단한 문제입니다. 먼저 배열의 크기를 입력받고, 그 다음 각 원소를 입력받아 합산합니다. 마지막으로 합산된 값을 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "2 2\n1 2\n3 4",
                  expected: "10"
                },
                {
                  stdin: "3 3\n1 1 1\n1 1 1\n1 1 1",
                  expected: "9"
                },
                {
                  stdin: "1 5\n-1 -2 -3 -4 -5",
                  expected: "-15",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u6-l1-c3",
              conceptTags: [
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 2차원 배열에서 각 행의 합을 계산하고, 그 중 최댓값을 찾아 출력하는 프로그램을 작성하세요.\n예시\n입력: 3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n출력: 51",
              explanation: "이 문제는 2차원 배열의 각 행의 합을 계산하고, 그 중 가장 큰 값을 찾는 것입니다. 먼저 배열을 입력받고, 각 행의 합을 계산하여 최댓값을 업데이트합니다. 최종적으로 최댓값을 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "2 3\n1 2 3\n4 5 6",
                  expected: "15"
                },
                {
                  stdin: "4 2\n1 2\n-1 -2\n3 4\n5 6",
                  expected: "11"
                },
                {
                  stdin: "3 3\n10 20 30\n40 50 60\n70 80 90",
                  expected: "240",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u6-l1-c4",
              conceptTags: ["list"],
              type: "SELECT",
              language: "java",
              question: "다음의 출력은?",
              codeSnippet: "int[][] grid = {{1, 2}, {3, 4}};\nSystem.out.println(grid[1][0]);",
              explanation: "grid[1][0] 은 두 번째 행([3,4])의 첫 번째 원소인 3입니다.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "4", correct: false },
                { id: "c", text: "1", correct: false },
                { id: "d", text: "컴파일 오류", correct: false },
              ],
            },
            {
              id: "java-u6-l1-c5",
              conceptTags: ["list"],
              type: "FILL",
              language: "java",
              question: "3행 4열 크기의 2차원 배열을 선언하도록 빈칸을 채우세요.",
              explanation: "new int[행][열] 형식으로 2차원 배열의 크기를 지정합니다.",
              fillCode: "int[][] grid = new int[3][{{0}}];",
              fillAnswers: [["4"]],
            },
            {
              id: "java-u6-l1-c6",
              conceptTags: ["list", "loop"],
              type: "PARSONS",
              language: "java",
              question: "2차원 배열의 모든 원소를 출력하는 프로그램이 되도록 순서를 맞추세요.",
              explanation: "바깥 반복문으로 행을, 안쪽 반복문으로 열을 순회합니다.",
              parsonsLines: [
                "int[][] grid = {{1, 2}, {3, 4}};",
                "for (int i = 0; i < 2; i++) {",
                "    for (int j = 0; j < 2; j++) {",
                "        System.out.println(grid[i][j]);",
                "    }",
                "}",
              ],
            },
            {
              id: "java-u6-l1-c7",
              conceptTags: ["list", "debug"],
              type: "BUGFIX",
              language: "java",
              question: "2차원 배열의 전체 합이 나와야 하는데 각 행의 마지막 열이 빠집니다. 버그를 고치세요.",
              explanation: "각 행의 열 개수는 3개이므로 안쪽 반복 조건은 j < 3 이어야 합니다.",
              starterCode:
                "int[][] grid = {{1, 2, 3}, {4, 5, 6}};\nint sum = 0;\nfor (int i = 0; i < 2; i++) {\n    for (int j = 0; j < 2; j++) {  // ← 버그\n        sum += grid[i][j];\n    }\n}\nSystem.out.println(sum);\n",
              testCases: [{ expected: "21" }],
            },
            {
              id: "java-u6-l1-c8",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "java",
              question:
                "n×n 크기의 2차원 배열을 입력받아, 왼쪽 위에서 오른쪽 아래로 이어지는 대각선의 합을 출력하세요.\n예시\n입력: 3\n1 2 3\n4 5 6\n7 8 9\n출력: 15",
              explanation: "grid[i][i] 형태로 인덱스가 같은 원소들을 더하면 대각선 합이 됩니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "3\n1 2 3\n4 5 6\n7 8 9", expected: "15" },
                { stdin: "2\n1 2\n3 4", expected: "5" },
                { stdin: "1\n7", expected: "7", hidden: true },
              ],
            },
            {
              id: "java-u6-l1-c9",
              conceptTags: ["list"],
              type: "SELECT",
              language: "java",
              question: "다음의 출력은?",
              codeSnippet: "int[][] grid = {{1, 2, 3}, {4, 5}};\nSystem.out.println(grid[1].length);",
              explanation: "grid[1] 은 두 번째 행({4, 5})이고, 그 길이(원소 개수)는 2입니다.",
              options: [
                { id: "a", text: "2", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "5", correct: false },
                { id: "d", text: "컴파일 오류", correct: false },
              ],
            },
            {
              id: "java-u6-l1-c10",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "java",
              question:
                "n×m 크기의 2차원 배열과 열 번호(0부터 시작)를 입력받아, 그 열의 합을 출력하세요.\n예시\n입력: 2 3\n1 2 3\n4 5 6\n1\n출력: 7",
              explanation: "각 행에서 지정된 열 인덱스의 값만 골라 더합니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "2 3\n1 2 3\n4 5 6\n1", expected: "7" },
                { stdin: "3 2\n1 2\n3 4\n5 6\n0", expected: "9" },
                { stdin: "1 1\n7\n0", expected: "7", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "java-u7",
      order: 7,
      title: "유닛 7 · 예외 처리",
      description: "예외를 처리해 프로그램이 죽지 않게 만들기",
      lessons: [
        {
          id: "java-u7-l1",
          title: "try-catch",
          challenges: [
            {
              id: "java-u7-l1-c1",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "java",
              question: "사용자로부터 숫자 문자열을 입력받아 정수로 변환하는 프로그램을 작성하세요. 만약 입력된 문자열이 숫자로 변환할 수 없는 경우, '잘못된 입력입니다'라는 메시지를 출력해야 합니다.\n예시\n입력: 123\n출력: 123",
              explanation: "이 프로그램은 사용자가 입력한 문자열을 정수로 변환하려고 시도합니다. 변환이 실패하면 NumberFormatException이 발생하고, 이 경우 catch 블록에서 오류 메시지를 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "456",
                  expected: "456"
                },
                {
                  stdin: "abc",
                  expected: "잘못된 입력입니다"
                },
                {
                  stdin: "78.9",
                  expected: "잘못된 입력입니다",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u7-l1-c2",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 정수 배열에서 특정 인덱스의 값을 출력하는 프로그램을 작성하세요. 만약 인덱스가 배열의 범위를 초과하면 '인덱스 초과'라는 메시지를 출력해야 합니다. 이 문제는 try-catch를 사용하여 오류를 처리해야 합니다.\n예시\n입력: 5\n1 2 3 4 5\n3\n출력: 4",
              explanation: "이 코드는 배열의 크기와 원소를 입력받고, 사용자가 요청한 인덱스의 값을 출력합니다. 만약 사용자가 입력한 인덱스가 배열의 범위를 초과하면, try-catch 문을 사용하여 '인덱스 초과'라는 메시지를 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "3\n10 20 30\n1",
                  expected: "20"
                },
                {
                  stdin: "4\n5 15 25 35\n5",
                  expected: "인덱스 초과"
                },
                {
                  stdin: "2\n-1 0\n0",
                  expected: "-1",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u7-l1-c3",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "java",
              question: "사용자로부터 정수를 입력받아, 입력이 유효한지 검증하는 프로그램을 작성하세요. 입력이 유효하지 않은 경우, 예외를 처리하여 오류 메시지를 출력해야 합니다. 프로그램은 항상 마지막에 '프로그램 종료'라는 메시지를 출력해야 합니다.\n예시\n입력: 10\n출력: 10\n프로그램 종료",
              explanation: "이 프로그램은 Scanner를 사용하여 사용자로부터 입력을 받습니다. try 블록 내에서 정수를 입력받고, 만약 입력이 유효하지 않으면 catch 블록에서 예외를 처리하여 오류 메시지를 출력합니다. finally 블록에서는 항상 '프로그램 종료'라는 메시지를 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "20",
                  expected: "20\n프로그램 종료"
                },
                {
                  stdin: "abc",
                  expected: "유효하지 않은 입력입니다. 정수를 입력하세요.\n프로그램 종료"
                },
                {
                  stdin: "-5",
                  expected: "-5\n프로그램 종료",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u7-l1-c4",
              conceptTags: ["exception"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력은?",
              codeSnippet:
                'try {\n    int x = Integer.parseInt("abc");\n} catch (NumberFormatException e) {\n    System.out.println("오류 발생");\n}',
              explanation: "'abc' 는 정수로 변환할 수 없어 NumberFormatException 이 발생하고, catch 블록이 실행됩니다.",
              options: [
                { id: "a", text: "오류 발생", correct: true },
                { id: "b", text: "abc", correct: false },
                { id: "c", text: "null", correct: false },
                { id: "d", text: "아무것도 출력되지 않음", correct: false },
              ],
            },
            {
              id: "java-u7-l1-c5",
              conceptTags: ["exception"],
              type: "FILL",
              language: "java",
              question: "예외가 발생했을 때 처리하도록 빈칸을 채우세요.",
              explanation: "예외를 잡아내는 키워드는 catch 입니다.",
              fillCode:
                'try {\n    System.out.println(10 / 0);\n} {{0}} (ArithmeticException e) {\n    System.out.println("0으로 나눌 수 없습니다");\n}',
              fillAnswers: [["catch"]],
            },
            {
              id: "java-u7-l1-c6",
              conceptTags: ["exception"],
              type: "PARSONS",
              language: "java",
              question:
                "나눗셈을 시도하고, 0으로 나누면 오류 메시지를, 항상 마지막엔 '완료' 를 출력하도록 순서를 맞추세요.",
              explanation: "finally 블록은 예외 발생 여부와 상관없이 항상 실행됩니다.",
              parsonsLines: [
                "try {",
                "    System.out.println(10 / 2);",
                "} catch (ArithmeticException e) {",
                '    System.out.println("오류");',
                "} finally {",
                '    System.out.println("완료");',
                "}",
              ],
            },
            {
              id: "java-u7-l1-c7",
              conceptTags: ["exception", "debug"],
              type: "BUGFIX",
              language: "java",
              question: "0으로 나누면 오류 메시지가 나와야 하는데 프로그램이 예외로 멈춰버립니다. 버그를 고치세요.",
              explanation:
                "정수를 0으로 나누면 ArithmeticException 이 발생합니다. catch 타입을 ArithmeticException 으로 바꿔야 합니다.",
              starterCode:
                'try {\n    int a = 10, b = 0;\n    System.out.println(a / b);\n} catch (NullPointerException e) {  // ← 버그\n    System.out.println("0으로 나눌 수 없습니다");\n}\n',
              testCases: [{ expected: "0으로 나눌 수 없습니다" }],
            },
            {
              id: "java-u7-l1-c8",
              conceptTags: ["exception", "io"],
              type: "WRITE",
              language: "java",
              question:
                "정수 두 개를 입력받아 첫 번째를 두 번째로 나눈 몫을 출력하세요. 두 번째 수가 0이면 '0으로 나눌 수 없습니다' 를 출력하세요.\n예시\n입력: 10\n0\n출력: 0으로 나눌 수 없습니다",
              explanation: "나눗셈을 try 블록에 넣고, ArithmeticException 을 catch 로 잡습니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "10\n2", expected: "5" },
                { stdin: "7\n0", expected: "0으로 나눌 수 없습니다" },
                { stdin: "20\n4", expected: "5", hidden: true },
              ],
            },
            {
              id: "java-u7-l1-c9",
              conceptTags: ["exception"],
              type: "SELECT",
              language: "java",
              question: "다음 코드의 출력은?",
              codeSnippet:
                'try {\n    int[] arr = new int[3];\n    System.out.println(arr[5]);\n} catch (NumberFormatException e) {\n    System.out.println("숫자 오류");\n} catch (ArrayIndexOutOfBoundsException e) {\n    System.out.println("배열 범위 오류");\n}',
              explanation:
                "arr[5] 는 배열 범위를 벗어나 ArrayIndexOutOfBoundsException 이 발생합니다. 첫 catch 는 맞지 않고, 두 번째 catch 가 실행됩니다.",
              options: [
                { id: "a", text: "배열 범위 오류", correct: true },
                { id: "b", text: "숫자 오류", correct: false },
                { id: "c", text: "5", correct: false },
                { id: "d", text: "오류가 두 번 출력됨", correct: false },
              ],
            },
            {
              id: "java-u7-l1-c10",
              conceptTags: ["exception", "io"],
              type: "WRITE",
              language: "java",
              question:
                "문자열을 입력받아 정수로 변환한 뒤 2배를 출력하세요. 변환할 수 없으면 '변환 실패' 를 출력하세요.",
              explanation: "Integer.parseInt() 를 try 블록에 넣고, NumberFormatException 을 catch 로 잡습니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "5", expected: "10" },
                { stdin: "abc", expected: "변환 실패" },
                { stdin: "-3", expected: "-6", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "java-u8",
      order: 8,
      title: "유닛 8 · 재귀 함수",
      description: "메서드가 자기 자신을 호출해 문제를 나눠 풀기",
      lessons: [
        {
          id: "java-u8-l1",
          title: "재귀로 풀기",
          challenges: [
            {
              id: "java-u8-l1-c1",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "java",
              question: "자연수 N이 주어졌을 때, N의 팩토리얼을 계산하는 재귀 메서드를 작성하세요. 팩토리얼은 N!로 표시되며, N! = N × (N-1)! 입니다. 단, 0! = 1입니다.\n예시\n입력: 5\n출력: 120",
              explanation: "이 코드는 재귀 메서드를 사용하여 팩토리얼을 계산합니다. 입력된 자연수 N이 0일 경우 1을 반환하고, 그렇지 않으면 N과 (N-1)의 팩토리얼을 곱하여 결과를 반환합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "1"
                },
                {
                  stdin: "3",
                  expected: "6"
                },
                {
                  stdin: "4",
                  expected: "24",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u8-l1-c2",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "java",
              question: "재귀 메서드를 사용하여 n번째 피보나치 수를 구하는 프로그램을 작성하세요.\n예시\n입력: 5\n출력: 5",
              explanation: "이 프로그램은 재귀적으로 피보나치 수열을 계산합니다. n이 0일 때 0을 반환하고, n이 1일 때 1을 반환합니다. 그 외의 경우에는 n-1과 n-2의 피보나치 수를 더하여 반환합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "0"
                },
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "10",
                  expected: "55",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u8-l1-c3",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "java",
              question: "재귀 메서드를 사용하여 1부터 n까지의 합을 구하는 프로그램을 작성하세요.\n예시\n입력: 5\n출력: 15",
              explanation: "이 프로그램은 재귀 메서드 sum을 사용하여 1부터 n까지의 합을 계산합니다. n이 1일 때 1을 반환하고, 그 외의 경우에는 n과 n-1까지의 합을 재귀적으로 호출하여 더합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "10",
                  expected: "55"
                },
                {
                  stdin: "100",
                  expected: "5050",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u8-l1-c4",
              conceptTags: ["recursion"],
              type: "SELECT",
              language: "java",
              question: "다음 프로그램의 출력은?",
              codeSnippet:
                "static int f(int n) {\n    if (n == 0) return 0;\n    return n + f(n - 1);\n}\n\npublic static void main(String[] args) {\n    System.out.println(f(3));\n}",
              explanation: "f(3) = 3 + f(2) = 3+2+f(1) = 3+2+1+f(0) = 6.",
              options: [
                { id: "a", text: "6", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "0", correct: false },
                { id: "d", text: "컴파일 오류", correct: false },
              ],
            },
            {
              id: "java-u8-l1-c5",
              conceptTags: ["recursion"],
              type: "FILL",
              language: "java",
              question: "n이 0일 때 1을 반환하도록(팩토리얼의 기저 조건) 빈칸을 채우세요.",
              explanation: "0! 은 1로 정의되므로 기저 조건에서 1을 반환해야 합니다.",
              fillCode: "static int factorial(int n) {\n    if (n == 0) return {{0}};\n    return n * factorial(n - 1);\n}",
              fillAnswers: [["1"]],
            },
            {
              id: "java-u8-l1-c6",
              conceptTags: ["recursion"],
              type: "PARSONS",
              language: "java",
              question: "n부터 1까지 출력한 뒤 재귀를 멈추는 메서드가 되도록 순서를 맞추세요.",
              explanation: "n이 0이 되면 return 으로 재귀를 멈추고, 그 전엔 출력 후 n-1 로 자신을 호출합니다.",
              parsonsLines: [
                "static void countdown(int n) {",
                "    if (n == 0) {",
                "        return;",
                "    }",
                "    System.out.println(n);",
                "    countdown(n - 1);",
                "}",
              ],
            },
            {
              id: "java-u8-l1-c7",
              conceptTags: ["recursion", "debug"],
              type: "BUGFIX",
              language: "java",
              question: "0! 은 1이어야 하는데 기저 조건이 잘못되어 항상 0이 출력됩니다. 버그를 고치세요.",
              explanation: "곱셈의 기저 조건은 0이 아니라 1이어야 합니다.",
              starterCode:
                "static int factorial(int n) {\n    if (n == 0) return 0;      // ← 버그\n    return n * factorial(n - 1);\n}\n\npublic static void main(String[] args) {\n    System.out.println(factorial(4));\n}\n",
              testCases: [{ expected: "24" }],
            },
            {
              id: "java-u8-l1-c8",
              conceptTags: ["recursion", "io"],
              type: "WRITE",
              language: "java",
              question:
                "정수 x와 n(0 이상)을 입력받아, 재귀 메서드로 x의 n제곱을 계산해 출력하세요.\n예시\n입력: 2 5\n출력: 32",
              explanation: "기저 조건 n==0 이면 1을 반환하고, 그 외엔 x * power(x, n-1) 을 반환합니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "2 5", expected: "32" },
                { stdin: "3 0", expected: "1" },
                { stdin: "5 2", expected: "25", hidden: true },
              ],
            },
            {
              id: "java-u8-l1-c9",
              conceptTags: ["recursion"],
              type: "SELECT",
              language: "java",
              question: "다음 프로그램의 출력은?",
              codeSnippet:
                "static int rec(int n) {\n    if (n <= 1) return 1;\n    return rec(n - 1) + rec(n - 2);\n}\n\npublic static void main(String[] args) {\n    System.out.println(rec(4));\n}",
              explanation: "rec(4) = rec(3)+rec(2) = 3+2 = 5 입니다 (기저 조건: n<=1 이면 1).",
              options: [
                { id: "a", text: "5", correct: true },
                { id: "b", text: "4", correct: false },
                { id: "c", text: "8", correct: false },
                { id: "d", text: "3", correct: false },
              ],
            },
            {
              id: "java-u8-l1-c10",
              conceptTags: ["recursion", "io"],
              type: "WRITE",
              language: "java",
              question:
                "0 이상의 정수를 입력받아 각 자릿수의 합을 재귀 메서드로 구해 출력하세요.\n예시\n입력: 123\n출력: 6",
              explanation: "n이 한 자리 수(n < 10)면 n을 반환하고, 그 외엔 n%10 + digitSum(n/10) 을 반환합니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "123", expected: "6" },
                { stdin: "9", expected: "9" },
                { stdin: "1000", expected: "1", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "java-u9",
      order: 9,
      title: "유닛 9 · 정렬과 탐색",
      description: "배열을 정렬하고 원하는 값을 찾기",
      lessons: [
        {
          id: "java-u9-l1",
          title: "정렬·탐색 기초",
          challenges: [
            {
              id: "java-u9-l1-c1",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 정수 배열을 오름차순으로 정렬하는 버블 정렬 알고리즘을 구현하세요.\n예시\n입력: 5\n5 3 8 1 2\n출력: 1 2 3 5 8",
              explanation: "버블 정렬은 인접한 두 원소를 비교하여 정렬하는 간단한 알고리즘입니다. 이 문제에서는 사용자가 입력한 배열을 버블 정렬을 통해 오름차순으로 정렬한 후 결과를 출력하도록 합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "3\n3 1 2",
                  expected: "1 2 3"
                },
                {
                  stdin: "4\n4 3 2 1",
                  expected: "1 2 3 4"
                },
                {
                  stdin: "6\n10 -1 2 0 5 -5",
                  expected: "-5 -1 0 2 5 10",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u9-l1-c2",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 정수 배열에서 특정 값을 선형 탐색을 통해 찾는 프로그램을 작성하세요. 값이 배열에 존재하면 해당 값의 인덱스를 출력하고, 존재하지 않으면 -1을 출력합니다.\n예시\n입력: 5\n1 2 3 4 5\n3\n출력: 2",
              explanation: "이 문제는 선형 탐색을 통해 배열에서 특정 값을 찾는 방법을 학습하는 데 도움이 됩니다. 배열을 순회하면서 각 요소와 찾고자 하는 값을 비교하여 일치하는 경우 인덱스를 출력합니다. 일치하는 값이 없으면 -1을 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "5\n1 2 3 4 5\n3",
                  expected: "2"
                },
                {
                  stdin: "4\n10 20 30 40\n25",
                  expected: "-1"
                },
                {
                  stdin: "6\n7 8 9 10 11 12\n10",
                  expected: "3",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u9-l1-c3",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "정렬된 배열에서 특정 값을 이진 탐색을 이용하여 찾는 프로그램을 작성하세요. 값이 배열에 존재하면 해당 값의 인덱스를 반환하고, 존재하지 않으면 -1을 반환해야 합니다.\n예시\n입력: 5\n1 3 5 7 9\n5\n출력: 2",
              explanation: "이 프로그램은 이진 탐색 알고리즘을 사용하여 정렬된 배열에서 특정 값을 찾습니다. 배열의 중간 값을 확인하고, 찾고자 하는 값과 비교하여 탐색 범위를 반으로 줄여나갑니다. 이진 탐색은 O(log N) 시간 복잡도를 가지므로 효율적입니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "5\n1 3 5 7 9\n5",
                  expected: "2"
                },
                {
                  stdin: "6\n2 4 6 8 10 12\n7",
                  expected: "-1"
                },
                {
                  stdin: "7\n1 2 3 4 5 6 7\n1",
                  expected: "0",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u9-l1-c4",
              conceptTags: ["algorithm", "list"],
              type: "SELECT",
              language: "java",
              question: "다음의 출력은?",
              codeSnippet:
                'int[] arr = {3, 1, 2};\nint temp;\nif (arr[0] > arr[1]) {\n    temp = arr[0];\n    arr[0] = arr[1];\n    arr[1] = temp;\n}\nSystem.out.println(arr[0] + " " + arr[1] + " " + arr[2]);',
              explanation: "arr[0](3) 이 arr[1](1) 보다 크므로 두 값을 맞바꿔 1 3 2 가 됩니다.",
              options: [
                { id: "a", text: "1 3 2", correct: true },
                { id: "b", text: "3 1 2", correct: false },
                { id: "c", text: "1 2 3", correct: false },
                { id: "d", text: "2 1 3", correct: false },
              ],
            },
            {
              id: "java-u9-l1-c5",
              conceptTags: ["algorithm"],
              type: "FILL",
              language: "java",
              question: "오름차순 정렬을 위해 인접한 두 값의 순서가 잘못됐는지 확인하도록 빈칸을 채우세요.",
              explanation: "오름차순 정렬에서는 앞의 값이 뒤의 값보다 크면(>) 순서가 잘못된 것이므로 교환합니다.",
              fillCode: "if (arr[i] {{0}} arr[i + 1]) {\n    // swap\n}",
              fillAnswers: [[">"]],
            },
            {
              id: "java-u9-l1-c6",
              conceptTags: ["algorithm", "list"],
              type: "PARSONS",
              language: "java",
              question: "배열에서 특정 값을 찾아 인덱스를 출력하는 프로그램이 되도록 순서를 맞추세요 (없으면 -1).",
              explanation: "배열을 순회하며 찾는 값과 같은 인덱스를 idx 에 저장합니다.",
              parsonsLines: [
                "int[] arr = {5, 3, 8, 1};",
                "int target = 8, idx = -1;",
                "for (int i = 0; i < arr.length; i++) {",
                "    if (arr[i] == target) {",
                "        idx = i;",
                "    }",
                "}",
                "System.out.println(idx);",
              ],
            },
            {
              id: "java-u9-l1-c7",
              conceptTags: ["algorithm", "debug"],
              type: "BUGFIX",
              language: "java",
              question: "배열의 마지막 원소를 못 찾는 버그가 있습니다. target(4)의 인덱스가 나오도록 고치세요.",
              explanation: "반복 조건이 i < 3 이면 마지막 인덱스(3)를 검사하지 못합니다. i < arr.length(4) 로 고쳐야 합니다.",
              starterCode:
                "int[] arr = {1, 2, 3, 4};\nint target = 4, idx = -1;\nfor (int i = 0; i < 3; i++) {  // ← 버그\n    if (arr[i] == target) {\n        idx = i;\n    }\n}\nSystem.out.println(idx);\n",
              testCases: [{ expected: "3" }],
            },
            {
              id: "java-u9-l1-c8",
              conceptTags: ["algorithm", "list", "io"],
              type: "WRITE",
              language: "java",
              question: "정수 n개를 입력받아, 평균보다 큰 값의 개수를 출력하세요.\n예시\n입력: 5\n1 2 3 4 5\n출력: 2",
              explanation: "먼저 평균을 구한 뒤, 배열을 다시 순회하며 평균보다 큰 값의 개수를 셉니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "5\n1 2 3 4 5", expected: "2" },
                { stdin: "3\n10 20 30", expected: "1" },
                { stdin: "4\n1 1 1 1", expected: "0", hidden: true },
              ],
            },
            {
              id: "java-u9-l1-c9",
              conceptTags: ["algorithm"],
              type: "SELECT",
              language: "java",
              question: "다음의 출력은?",
              codeSnippet: "int low = 0, high = 9;\nint mid = (low + high) / 2;\nSystem.out.println(mid);",
              explanation: "(0 + 9) / 2 는 정수 나눗셈으로 4가 됩니다 (소수점 버림).",
              options: [
                { id: "a", text: "4", correct: true },
                { id: "b", text: "5", correct: false },
                { id: "c", text: "4.5", correct: false },
                { id: "d", text: "9", correct: false },
              ],
            },
            {
              id: "java-u9-l1-c10",
              conceptTags: ["algorithm", "list", "io"],
              type: "WRITE",
              language: "java",
              question:
                "정수 n개를 입력받아 오름차순으로 정렬한 뒤, 공백으로 구분해 출력하세요.\n예시\n입력: 5\n5 3 8 1 2\n출력: 1 2 3 5 8",
              explanation: "선택 정렬이나 버블 정렬로 배열을 오름차순 정렬한 뒤 출력합니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "5\n5 3 8 1 2", expected: "1 2 3 5 8" },
                { stdin: "3\n3 1 2", expected: "1 2 3" },
                { stdin: "4\n4 4 4 4", expected: "4 4 4 4", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "java-u10",
      order: 10,
      title: "유닛 10 · 종합 응용",
      description: "배운 개념을 조합해 풀어보는 응용 문제",
      lessons: [
        {
          id: "java-u10-l1",
          title: "종합 문제",
          challenges: [
            {
              id: "java-u10-l1-c2",
              conceptTags: [
                "function",
                "loop"
              ],
              type: "WRITE",
              language: "java",
              question: "사용자로부터 정수를 입력받아 그 합계를 계산하는 메서드를 작성하세요. 사용자는 0을 입력할 때까지 정수를 입력해야 하며, 0은 합계에 포함되지 않습니다.\n예시\n입력: 5\n10\n-3\n0\n출력: 12",
              explanation: "이 프로그램은 Scanner 클래스를 사용하여 사용자로부터 정수를 입력받습니다. 반복문을 통해 0이 입력될 때까지 각 입력된 정수를 합산합니다. 0이 입력되면 반복문을 종료하고 최종 합계를 출력합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "1\n2\n3\n4\n0",
                  expected: "10"
                },
                {
                  stdin: "10\n-5\n-5\n0",
                  expected: "0"
                },
                {
                  stdin: "0",
                  expected: "0",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u10-l1-c3",
              conceptTags: [
                "condition",
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "주어진 정수 배열에서 최대값과 최소값을 찾아 출력하는 프로그램을 작성하세요.\n예시\n입력: 5\n3 -1 4 2 0\n출력: 4\n-1",
              explanation: "이 프로그램은 주어진 정수 배열에서 최대값과 최소값을 찾기 위해 두 개의 변수를 사용합니다. 배열을 순회하면서 각 요소를 비교하여 최대값과 최소값을 업데이트합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "3\n1 2 3",
                  expected: "3\n1"
                },
                {
                  stdin: "4\n-5 -10 -3 -1",
                  expected: "-1\n-10"
                },
                {
                  stdin: "6\n10 20 30 40 50 60",
                  expected: "60\n10",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u10-l1-c4",
              conceptTags: [
                "oop",
                "list"
              ],
              type: "WRITE",
              language: "java",
              question: "여러 학생의 점수를 배열에 저장하고, 그 점수들의 평균을 계산하는 프로그램을 작성하세요. 학생의 수와 각 학생의 점수는 사용자로부터 입력받습니다.\n예시\n입력: 5\n80 90 70 85 95\n출력: 84.00",
              explanation: "이 프로그램은 학생의 수와 점수를 입력받아 배열에 저장한 후, 평균을 계산하여 출력합니다. 평균 계산은 점수의 합을 점수의 개수로 나누어 수행합니다.",
              starterCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                {
                  stdin: "3\n60 70 80",
                  expected: "70.00"
                },
                {
                  stdin: "4\n100 90 80 70",
                  expected: "85.00"
                },
                {
                  stdin: "2\n50 50",
                  expected: "50.00",
                  hidden: true
                }
              ]
            },
            {
              id: "java-u10-l1-c5",
              conceptTags: ["oop", "list"],
              type: "SELECT",
              language: "java",
              question: "다음의 출력은?",
              codeSnippet:
                'class Item {\n    String name;\n    int price;\n    Item(String name, int price) { this.name = name; this.price = price; }\n}\n\nItem[] items = {new Item("pen", 1000), new Item("cup", 3000)};\nSystem.out.println(items[1].price);',
              explanation: "items[1] 은 두 번째 원소(cup, 3000)이므로 .price 는 3000입니다.",
              options: [
                { id: "a", text: "3000", correct: true },
                { id: "b", text: "1000", correct: false },
                { id: "c", text: "cup", correct: false },
                { id: "d", text: "컴파일 오류", correct: false },
              ],
            },
            {
              id: "java-u10-l1-c6",
              conceptTags: ["condition"],
              type: "FILL",
              language: "java",
              question: "3과 5 모두의 배수인지 확인하도록 빈칸을 채우세요.",
              explanation: "두 조건을 모두 만족해야 하므로 && 를 사용합니다.",
              fillCode: "if (n % 3 == 0 {{0}} n % 5 == 0) {\n    System.out.println(\"FizzBuzz\");\n}",
              fillAnswers: [["&&"]],
            },
            {
              id: "java-u10-l1-c7",
              conceptTags: ["function", "loop"],
              type: "PARSONS",
              language: "java",
              question: "1부터 n까지 제곱의 합을 구하는 메서드를 만들어 호출하는 프로그램이 되도록 순서를 맞추세요.",
              explanation: "1²+2²+3² = 1+4+9 = 14 를 반환합니다.",
              parsonsLines: [
                "static int sumOfSquares(int n) {",
                "    int total = 0;",
                "    for (int i = 1; i <= n; i++) {",
                "        total += i * i;",
                "    }",
                "    return total;",
                "}",
                "public static void main(String[] args) {",
                "    System.out.println(sumOfSquares(3));",
                "}",
              ],
            },
            {
              id: "java-u10-l1-c8",
              conceptTags: ["string", "loop", "debug"],
              type: "BUGFIX",
              language: "java",
              question:
                "'banana' 에서 'a' 의 개수를 세는데 마지막 글자를 놓쳐 3이 아니라 2가 나옵니다. 버그를 고치세요.",
              explanation: "'banana' 는 길이가 6이므로 반복 조건은 i < 6(또는 s.length()) 이어야 합니다.",
              starterCode:
                "String s = \"banana\";\nint count = 0;\nfor (int i = 0; i < 5; i++) {  // ← 버그\n    if (s.charAt(i) == 'a') {\n        count++;\n    }\n}\nSystem.out.println(count);\n",
              testCases: [{ expected: "3" }],
            },
            {
              id: "java-u10-l1-c9",
              conceptTags: ["loop", "condition", "io"],
              type: "WRITE",
              language: "java",
              question: "정수 n개를 입력받아, 그 중 3의 배수의 개수를 출력하세요.\n예시\n입력: 5\n3 4 6 7 9\n출력: 3",
              explanation: "각 값을 3으로 나눈 나머지가 0인지 확인하며 개수를 셉니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "5\n3 4 6 7 9", expected: "3" },
                { stdin: "3\n1 2 4", expected: "0" },
                { stdin: "4\n3 3 3 3", expected: "4", hidden: true },
              ],
            },
            {
              id: "java-u10-l1-c10",
              conceptTags: ["list", "function"],
              type: "SELECT",
              language: "java",
              question: "다음 프로그램의 출력은?",
              codeSnippet:
                "static void increment(int[] arr) {\n    arr[0]++;\n}\n\npublic static void main(String[] args) {\n    int[] a = {5};\n    increment(a);\n    System.out.println(a[0]);\n}",
              explanation:
                "배열은 객체이므로 메서드에 넘겨도 같은 배열을 가리킵니다. 메서드 안에서 바꾼 값이 그대로 반영되어 6이 출력됩니다.",
              options: [
                { id: "a", text: "6", correct: true },
                { id: "b", text: "5", correct: false },
                { id: "c", text: "0", correct: false },
                { id: "d", text: "컴파일 오류", correct: false },
              ],
            },
            {
              id: "java-u10-l1-c11",
              conceptTags: ["loop", "condition", "io"],
              type: "WRITE",
              language: "java",
              question:
                "정수 n을 입력받아 1부터 n까지, 3의 배수면 'Fizz', 5의 배수면 'Buzz', 둘 다면 'FizzBuzz', 그 외엔 숫자 자체를 한 줄씩 출력하세요.",
              explanation: "15의 배수(3과 5 모두의 배수) 여부를 먼저 확인한 뒤, 3의 배수, 5의 배수, 그 외 순서로 검사합니다.",
              starterCode:
                "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // 여기에 코드를 작성하세요\n    }\n}\n",
              testCases: [
                { stdin: "5", expected: "1\n2\nFizz\n4\nBuzz" },
                { stdin: "3", expected: "1\n2\nFizz" },
                {
                  stdin: "15",
                  expected:
                    "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
                  hidden: true,
                },
              ],
            },
          ]
        }
      ]
    },
  ],
};

export const javascript: Course = {
  id: "javascript",
  title: "자바스크립트 입문",
  emoji: "🟨",
  description: "실행하며 배우는 자바스크립트 기초",
  units: [
    {
      id: "js-u1",
      order: 1,
      title: "유닛 1 · JS 첫 걸음",
      description: "console.log·변수부터 배열·함수까지, 브라우저에서 바로 실행",
      lessons: [
        {
          id: "js-u1-l1",
          title: "출력과 변수",
          challenges: [
            {
              id: "js-u1-l1-c1",
              conceptTags: ["output"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: 'console.log("코딩고링");',
              explanation:
                "console.log() 는 괄호 안의 값을 출력합니다. 따옴표는 출력되지 않습니다.",
              options: [
                { id: "a", text: "코딩고링", correct: true },
                { id: "b", text: '"코딩고링"', correct: false },
                { id: "c", text: "console.log(코딩고링)", correct: false },
                { id: "d", text: "undefined", correct: false },
              ],
            },
            {
              id: "js-u1-l1-c2",
              conceptTags: ["variable", "operator"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: 'const x = "3";\nconsole.log(x + 4);',
              explanation:
                "문자열 \"3\" 에 숫자를 + 하면 문자열로 이어 붙습니다. '3' + 4 → '34'.",
              options: [
                { id: "a", text: "34", correct: true },
                { id: "b", text: "7", correct: false },
                { id: "c", text: "'3' + 4", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u1-l1-c3",
              conceptTags: ["output"],
              type: "WRITE",
              language: "javascript",
              question:
                "정확히 다음 한 줄을 출력하는 프로그램을 작성하세요:  안녕, 코딩고링!",
              explanation: 'console.log("안녕, 코딩고링!") 처럼 문자열을 그대로 출력하면 됩니다.',
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [{ expected: "안녕, 코딩고링!" }],
            },
            {
              id: "js-u1-l1-c4",
              conceptTags: ["output", "variable"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: 'const name = "코딩고링";\nconsole.log(`안녕, ${name}!`);',
              explanation: "템플릿 리터럴(백틱) 안의 ${} 는 변수의 값을 그대로 넣어줍니다.",
              options: [
                { id: "a", text: "안녕, 코딩고링!", correct: true },
                { id: "b", text: "안녕, ${name}!", correct: false },
                { id: "c", text: "안녕, name!", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u1-l1-c5",
              conceptTags: ["variable"],
              type: "FILL",
              language: "javascript",
              question: "값이 바뀌지 않는 상수를 선언하도록 빈칸을 채우세요.",
              explanation: "값이 바뀌지 않는 변수는 const 로 선언합니다.",
              fillCode: "{{0}} age = 20;\nconsole.log(age);",
              fillAnswers: [["const"]],
            },
            {
              id: "js-u1-l1-c6",
              conceptTags: ["variable", "operator"],
              type: "PARSONS",
              language: "javascript",
              question: "두 숫자를 선언하고 곱을 출력하는 프로그램이 되도록 줄 순서를 맞추세요.",
              explanation: "변수를 선언한 뒤 계산 결과를 출력합니다.",
              parsonsLines: ["const a = 3;", "const b = 4;", "console.log(a * b);"],
            },
            {
              id: "js-u1-l1-c7",
              conceptTags: ["operator", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question: "두 수의 합이 나와야 하는데 뺄셈 연산자가 쓰였습니다. 버그를 고치세요.",
              explanation: "덧셈은 + 연산자를 사용해야 합니다.",
              starterCode: "const a = 3, b = 4;\nconsole.log(a - b);      // ← 버그\n",
              testCases: [{ expected: "7" }],
            },
            {
              id: "js-u1-l1-c8",
              conceptTags: ["variable", "operator", "io"],
              type: "WRITE",
              language: "javascript",
              question: "정수 두 개를 입력받아 그 곱을 출력하세요.\n예시\n입력: 3 4\n출력: 12",
              explanation: "input() 으로 한 줄을 받아 split(\" \") 로 나누고 Number() 로 바꿔 곱합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "3 4", expected: "12" },
                { stdin: "5 5", expected: "25" },
                { stdin: "0 9", expected: "0", hidden: true },
              ],
            },
            {
              id: "js-u1-l1-c9",
              conceptTags: ["variable"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: 'console.log(typeof "5");',
              explanation: "따옴표로 감싼 값은 문자열(string) 타입입니다.",
              options: [
                { id: "a", text: "string", correct: true },
                { id: "b", text: "number", correct: false },
                { id: "c", text: "5", correct: false },
                { id: "d", text: "undefined", correct: false },
              ],
            },
            {
              id: "js-u1-l1-c10",
              conceptTags: ["variable", "io"],
              type: "WRITE",
              language: "javascript",
              question: "정수와 실수를 각 줄에 입력받아, 그 합을 출력하세요.\n예시\n입력: 3\n2.5\n출력: 5.5",
              explanation: "input() 을 두 번 호출해 각각 Number() 로 바꾼 뒤 더합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "3\n2.5", expected: "5.5" },
                { stdin: "10\n0.5", expected: "10.5" },
                { stdin: "0\n1.25", expected: "1.25", hidden: true },
              ],
            },
          ],
        },
        {
          id: "js-u1-l2",
          title: "배열과 반복",
          challenges: [
            {
              id: "js-u1-l2-c1",
              conceptTags: ["list"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: "const a = [10, 20, 30];\nconsole.log(a.length);",
              explanation: ".length 는 배열의 길이입니다. 원소가 3개이므로 3.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "30", correct: false },
                { id: "c", text: "2", correct: false },
                { id: "d", text: "[10, 20, 30]", correct: false },
              ],
            },
            {
              id: "js-u1-l2-c2",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question:
                "0부터 n-1까지 한 줄에 하나씩 출력해야 하는데 n까지 출력됩니다. 고치세요.",
              explanation:
                "반복 조건이 i <= n 이면 n 도 포함됩니다. i < n 이어야 0부터 n-1까지 나옵니다.",
              starterCode:
                'const n = Number(input());\nfor (let i = 0; i <= n; i++) {  // ← 버그\n  console.log(i);\n}\n',
              testCases: [
                { stdin: "3", expected: "0\n1\n2" },
                { stdin: "1", expected: "0" },
                { stdin: "5", expected: "0\n1\n2\n3\n4", hidden: true },
              ],
            },
            {
              id: "js-u1-l2-c3",
              conceptTags: ["io", "operator"],
              type: "WRITE",
              language: "javascript",
              question:
                "한 줄에 공백으로 구분된 정수 두 개를 입력받아 그 합을 출력하세요. (input() 으로 한 줄을 읽을 수 있어요)",
              explanation:
                'input() 으로 "3 5" 같은 한 줄을 받아 split(" ") 로 나누고, Number() 로 바꿔 더하면 됩니다.',
              starterCode:
                '// input() 이 한 줄을 문자열로 돌려줘요\nconst line = input();\n// 여기에 코드를 작성하세요\n',
              testCases: [
                { stdin: "3 5", expected: "8" },
                { stdin: "10 20", expected: "30" },
                { stdin: "-4 4", expected: "0", hidden: true },
              ],
            },
            {
              id: "js-u1-l2-c4",
              conceptTags: ["list"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: "const arr = [10, 20, 30];\nconsole.log(arr[1]);",
              explanation: "인덱스는 0부터 시작하므로 arr[1] 은 두 번째 원소인 20입니다.",
              options: [
                { id: "a", text: "20", correct: true },
                { id: "b", text: "10", correct: false },
                { id: "c", text: "1", correct: false },
                { id: "d", text: "undefined", correct: false },
              ],
            },
            {
              id: "js-u1-l2-c5",
              conceptTags: ["list"],
              type: "FILL",
              language: "javascript",
              question: "배열에 40을 추가하도록 빈칸을 채우세요.",
              explanation: "배열 끝에 값을 추가할 때는 push() 를 사용합니다.",
              fillCode: "const arr = [10, 20, 30];\narr.{{0}}(40);\nconsole.log(arr);",
              fillAnswers: [["push"]],
            },
            {
              id: "js-u1-l2-c6",
              conceptTags: ["list", "loop"],
              type: "PARSONS",
              language: "javascript",
              question: "배열의 모든 원소를 더해 합계를 출력하도록 줄 순서를 맞추세요.",
              explanation: "for...of 로 배열의 각 원소를 순회하며 sum 에 더합니다.",
              parsonsLines: ["const arr = [1, 2, 3];", "let sum = 0;", "for (const n of arr) {", "  sum += n;", "}", "console.log(sum);"],
            },
            {
              id: "js-u1-l2-c7",
              conceptTags: ["list", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question: "배열의 합이 나와야 하는데 항상 0이 출력됩니다. 버그를 고치세요.",
              explanation: "length 철자가 틀렸습니다(lenght). arr.length 로 고쳐야 합니다.",
              starterCode:
                "const arr = [1, 2, 3];\nlet sum = 0;\nfor (let i = 0; i < arr.lenght; i++) {  // ← 버그\n  sum += arr[i];\n}\nconsole.log(sum);\n",
              testCases: [{ expected: "6" }],
            },
            {
              id: "js-u1-l2-c8",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "정수 5개를 입력받아(한 줄에 공백으로 구분) 배열에 저장한 뒤, 그 중 최댓값을 출력하세요.\n예시\n입력: 3 7 2 9 4\n출력: 9",
              explanation: "Math.max(...arr) 로 배열의 최댓값을 바로 구할 수 있습니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "3 7 2 9 4", expected: "9" },
                { stdin: "10 20 5 1 8", expected: "20" },
                { stdin: "1 1 1 1 1", expected: "1", hidden: true },
              ],
            },
            {
              id: "js-u1-l2-c9",
              conceptTags: ["list"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: "const a = [1, 2, 3];\nconst b = a;\nb[0] = 99;\nconsole.log(a[0]);",
              explanation:
                "배열은 객체라서 b = a 는 같은 배열을 가리킵니다. b를 바꾸면 a도 함께 바뀌어 99가 출력됩니다.",
              options: [
                { id: "a", text: "99", correct: true },
                { id: "b", text: "1", correct: false },
                { id: "c", text: "0", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u1-l2-c10",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "정수 5개를 입력받아 배열에 저장한 뒤, 역순으로 한 줄에 하나씩 출력하세요.\n예시\n입력: 1 2 3 4 5\n출력: 5\n4\n3\n2\n1",
              explanation: "배열을 reverse() 하거나 뒤에서부터 인덱스를 돌며 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "1 2 3 4 5", expected: "5\n4\n3\n2\n1" },
                { stdin: "10 20 30 40 50", expected: "50\n40\n30\n20\n10" },
                { stdin: "0 0 0 0 1", expected: "1\n0\n0\n0\n0", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "js-u2",
      order: 2,
      title: "유닛 2 · 함수와 객체",
      description: "함수로 로직을 재사용하고, 객체로 여러 값을 묶어 관리하기",
      lessons: [
        {
          id: "js-u2-l1",
          title: "함수",
          challenges: [
            {
              id: "js-u2-l1-c1",
              conceptTags: ["function"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: "function add(a, b) {\n  return a + b;\n}\nconsole.log(add(3, 4));",
              explanation: "add(3, 4) 는 3 + 4 를 계산해 7을 반환합니다.",
              options: [
                { id: "a", text: "7", correct: true },
                { id: "b", text: "34", correct: false },
                { id: "c", text: "a + b", correct: false },
                { id: "d", text: "undefined", correct: false },
              ],
            },
            {
              id: "js-u2-l1-c2",
              conceptTags: ["function", "io"],
              type: "PARSONS",
              language: "javascript",
              question: "정수를 입력받아 2배로 만들어 출력하도록 줄 순서를 맞추세요.",
              explanation: "함수를 먼저 정의하고, 입력을 받은 뒤, 함수를 호출해 출력합니다.",
              parsonsLines: [
                "function double(n) {",
                "  return n * 2;",
                "}",
                "const x = Number(input());",
                "console.log(double(x));",
              ],
            },
            {
              id: "js-u2-l1-c3",
              conceptTags: ["function", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "정수 n을 입력받아 n의 세제곱을 반환하는 함수 cube(n)을 작성하고, 그 결과를 출력하세요.",
              explanation: "함수 안에서 n * n * n 을 return 하면 됩니다.",
              starterCode:
                "function cube(n) {\n  // 여기에 코드를 작성하세요\n}\n\nconst n = Number(input());\nconsole.log(cube(n));\n",
              testCases: [
                { stdin: "3", expected: "27" },
                { stdin: "2", expected: "8" },
                { stdin: "0", expected: "0", hidden: true },
              ],
            },
            {
              id: "js-u2-l1-c4",
              conceptTags: ["function"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: "const add = (a, b) => a + b;\nconsole.log(add(3, 4));",
              explanation: "화살표 함수도 일반 함수처럼 호출할 수 있습니다. add(3,4) 는 7을 반환합니다.",
              options: [
                { id: "a", text: "7", correct: true },
                { id: "b", text: "34", correct: false },
                { id: "c", text: "a + b", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u2-l1-c5",
              conceptTags: ["function"],
              type: "FILL",
              language: "javascript",
              question: "함수가 a와 b의 곱을 반환하도록 빈칸을 채우세요.",
              explanation: "함수의 결과값을 돌려주려면 return 을 사용합니다.",
              fillCode: "function multiply(a, b) {\n  {{0}} a * b;\n}\nconsole.log(multiply(3, 4));",
              fillAnswers: [["return"]],
            },
            {
              id: "js-u2-l1-c6",
              conceptTags: ["function", "condition"],
              type: "PARSONS",
              language: "javascript",
              question: "두 수 중 큰 값을 반환하는 함수를 만들어 호출하는 프로그램이 되도록 줄 순서를 맞추세요.",
              explanation: "a가 b보다 크면 a를, 아니면 b를 반환합니다.",
              parsonsLines: [
                "function bigger(a, b) {",
                "  if (a > b) {",
                "    return a;",
                "  }",
                "  return b;",
                "}",
                "console.log(bigger(3, 7));",
              ],
            },
            {
              id: "js-u2-l1-c7",
              conceptTags: ["function", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question: "제곱값이 출력되어야 하는데 undefined 가 출력됩니다. 버그를 고치세요.",
              explanation:
                "계산만 하고 return 하지 않으면 함수는 undefined 를 돌려줍니다. return n * n; 으로 고쳐야 합니다.",
              starterCode: "function square(n) {\n  n * n;      // ← 버그\n}\nconsole.log(square(4));\n",
              testCases: [{ expected: "16" }],
            },
            {
              id: "js-u2-l1-c8",
              conceptTags: ["function", "condition", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "정수를 입력받아 짝수인지 판별하는 함수 isEven(n) 을 작성하고, 짝수면 'true', 홀수면 'false' 를 출력하세요.",
              explanation: "n % 2 === 0 의 결과(true/false)를 그대로 반환하면 됩니다.",
              starterCode:
                "function isEven(n) {\n  // 여기에 코드를 작성하세요\n}\n\nconst n = Number(input());\nconsole.log(isEven(n));\n",
              testCases: [
                { stdin: "4", expected: "true" },
                { stdin: "7", expected: "false" },
                { stdin: "0", expected: "true", hidden: true },
              ],
            },
            {
              id: "js-u2-l1-c9",
              conceptTags: ["function", "variable"],
              type: "SELECT",
              language: "javascript",
              question: "마지막 console.log(x) 는 무엇을 출력하나요?",
              codeSnippet: "let x = 10;\nfunction change() {\n  let x = 20;\n  console.log(x);\n}\nchange();\nconsole.log(x);",
              explanation:
                "함수 안의 let x = 20 은 지역 변수를 새로 만드는 것이라, 함수 밖의 전역 변수 x(10)에는 영향을 주지 않습니다.",
              options: [
                { id: "a", text: "10", correct: true },
                { id: "b", text: "20", correct: false },
                { id: "c", text: "오류가 납니다", correct: false },
                { id: "d", text: "undefined", correct: false },
              ],
            },
            {
              id: "js-u2-l1-c10",
              conceptTags: ["function", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "밑변과 높이를 입력받아 삼각형의 넓이를 반환하는 함수 triangleArea(base, height) 를 작성하고, 결과를 출력하세요. (밑변 × 높이 ÷ 2)",
              explanation: "base * height / 2 를 return 하면 됩니다.",
              starterCode:
                "function triangleArea(base, height) {\n  // 여기에 코드를 작성하세요\n}\n\nconst line = input();\n// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "4 6", expected: "12" },
                { stdin: "5 3", expected: "7.5" },
                { stdin: "10 2", expected: "10", hidden: true },
              ],
            },
          ],
        },
        {
          id: "js-u2-l2",
          title: "객체 기초",
          challenges: [
            {
              id: "js-u2-l2-c1",
              conceptTags: ["variable"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: 'const person = { name: "코리", age: 3 };\nconsole.log(person.name);',
              explanation: '객체의 속성은 점(.)으로 접근합니다. person.name 은 "코리"입니다.',
              options: [
                { id: "a", text: "코리", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "name", correct: false },
                { id: "d", text: "undefined", correct: false },
              ],
            },
            {
              id: "js-u2-l2-c2",
              conceptTags: ["variable"],
              type: "FILL",
              language: "javascript",
              question: "객체의 score 속성을 출력하도록 빈칸을 채우세요.",
              explanation: "점 뒤에 속성 이름을 그대로 쓰면 됩니다.",
              fillCode: "const obj = { score: 90 };\nconsole.log(obj.{{0}});",
              fillAnswers: [["score"]],
            },
            {
              id: "js-u2-l2-c3",
              conceptTags: ["variable", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question: "user.name 을 출력해야 하는데 undefined 가 나옵니다. 버그를 고치세요.",
              explanation:
                "자바스크립트는 대소문자를 구분합니다. 객체에 정의된 속성은 name(소문자)이지 Name(대문자)이 아닙니다.",
              starterCode: 'const user = { name: "코딩고링" };\nconsole.log(user.Name);  // ← 버그\n',
              testCases: [{ expected: "코딩고링" }],
            },
            {
              id: "js-u2-l2-c4",
              conceptTags: ["variable", "function"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: 'const dog = {\n  name: "바둑이",\n  bark() { return "멍멍"; }\n};\nconsole.log(dog.bark());',
              explanation: "객체의 메서드는 dog.bark() 처럼 호출합니다.",
              options: [
                { id: "a", text: "멍멍", correct: true },
                { id: "b", text: "bark", correct: false },
                { id: "c", text: "function", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u2-l2-c5",
              conceptTags: ["variable"],
              type: "FILL",
              language: "javascript",
              question: "변수 key 에 담긴 이름으로 속성 값을 가져오도록 빈칸을 채우세요.",
              explanation: "대괄호 표기법 obj[key] 는 변수에 담긴 문자열을 키로 사용해 값을 가져옵니다.",
              fillCode: 'const obj = { score: 90 };\nconst key = "score";\nconsole.log(obj[{{0}}]);',
              fillAnswers: [["key"]],
            },
            {
              id: "js-u2-l2-c6",
              conceptTags: ["variable"],
              type: "PARSONS",
              language: "javascript",
              question: "이름과 나이를 가진 객체를 만들어 이름을 출력하는 프로그램이 되도록 줄 순서를 맞추세요.",
              explanation: "빈 객체를 만든 뒤 점 표기법으로 속성을 추가할 수 있습니다.",
              parsonsLines: ["const person = {};", 'person.name = "코딩고링";', "person.age = 3;", "console.log(person.name);"],
            },
            {
              id: "js-u2-l2-c7",
              conceptTags: ["variable", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question: "중첩된 객체의 속성을 가져오지 못해 undefined 가 출력됩니다. 버그를 고치세요.",
              explanation:
                "width 는 box 바로 아래가 아니라 box.size 안에 있습니다. box.size.width 로 접근해야 합니다.",
              starterCode: "const box = { size: { width: 5, height: 10 } };\nconsole.log(box.width);      // ← 버그\n",
              testCases: [{ expected: "5" }],
            },
            {
              id: "js-u2-l2-c8",
              conceptTags: ["variable", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "이름과 나이를 각각 한 줄씩 입력받아 객체에 담은 뒤, 'name: age' 형식으로 출력하세요.\n예시\n입력: 코딩고링\n3\n출력: 코딩고링: 3",
              explanation: "두 번의 input() 으로 값을 받아 객체에 저장한 뒤 템플릿 리터럴로 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "코딩고링\n3", expected: "코딩고링: 3" },
                { stdin: "런닝\n5", expected: "런닝: 5" },
                { stdin: "test\n10", expected: "test: 10", hidden: true },
              ],
            },
            {
              id: "js-u2-l2-c9",
              conceptTags: ["variable"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: "const obj = { a: 1, b: 2, c: 3 };\nconsole.log(Object.keys(obj).length);",
              explanation: "Object.keys() 는 객체의 키들을 배열로 반환합니다. 키가 3개이므로 길이는 3.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "6", correct: false },
                { id: "c", text: "1", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u2-l2-c10",
              conceptTags: ["variable", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "가로(width)와 세로(height)를 속성으로 갖고, 넓이를 계산해 반환하는 area() 메서드를 가진 객체를 만드세요. 가로와 세로를 입력받아 결과를 출력하세요.\n예시\n입력: 3 5\n출력: 15",
              explanation: "area() 메서드 안에서 this.width * this.height 를 반환하면 됩니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "3 5", expected: "15" },
                { stdin: "4 4", expected: "16" },
                { stdin: "10 2", expected: "20", hidden: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "js-u3",
      order: 3,
      title: "유닛 3 · 배열 다루기",
      description: "배열에 값을 추가하고 정렬하기",
      lessons: [
        {
          id: "js-u3-l1",
          title: "배열 메서드",
          challenges: [
            {
              id: "js-u3-l1-c1",
              conceptTags: [
                "list"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 숫자들을 배열에 추가하고, 배열의 길이를 출력하는 프로그램을 작성하세요. 배열에 숫자를 추가할 때는 push() 메서드를 사용해야 합니다.\n예시\n입력: 3\n5 10 15\n출력: 3",
              explanation: "이 프로그램은 먼저 입력을 받아서 숫자의 개수 n과 숫자들을 배열에 추가합니다. push() 메서드를 사용하여 배열에 숫자를 추가한 후, 배열의 길이를 length 속성을 통해 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "2\n1 2",
                  expected: "2"
                },
                {
                  stdin: "5\n-1 0 1 2 3",
                  expected: "5"
                },
                {
                  stdin: "4\n10 20 30 40",
                  expected: "4",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u3-l1-c2",
              conceptTags: [
                "list"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 숫자 배열을 오름차순으로 정렬하여 출력하는 프로그램을 작성하세요. 입력은 한 줄에 공백으로 구분된 숫자들로 주어집니다.\n예시\n입력: 5 3 8 1 2\n출력: 1 2 3 5 8",
              explanation: "이 문제는 자바스크립트의 배열 sort() 메서드를 사용하여 숫자 배열을 오름차순으로 정렬하는 방법을 배우는 것입니다. 입력을 받아서 공백으로 구분된 숫자를 배열로 변환하고, sort() 메서드를 사용하여 정렬한 후, 결과를 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "10 2 5 1 3",
                  expected: "1 2 3 5 10"
                },
                {
                  stdin: "4 4 2 3 1",
                  expected: "1 2 3 4 4"
                },
                {
                  stdin: "7 9 2 6 5 3",
                  expected: "2 3 5 6 7 9",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u3-l1-c3",
              conceptTags: [
                "list",
                "algorithm"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 문자열 배열에서 특정 문자열을 찾아 그 인덱스를 출력하는 프로그램을 작성하세요. 만약 문자열이 배열에 존재하지 않으면 -1을 출력해야 합니다.\n예시\n입력: 5\napple banana cherry date elderberry\ncherry\n출력: 2",
              explanation: "이 코드는 입력으로 주어진 배열과 찾고자 하는 문자열을 받아서 indexOf() 메서드를 사용하여 문자열의 인덱스를 찾습니다. 찾은 인덱스를 출력하고, 문자열이 배열에 없으면 -1을 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "3\ncat dog mouse\ndog",
                  expected: "1"
                },
                {
                  stdin: "4\nred green blue yellow\npurple",
                  expected: "-1"
                },
                {
                  stdin: "6\none two three four five six\nfive",
                  expected: "4",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u3-l1-c4",
              conceptTags: ["list"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: "const arr = [1, 2, 3];\nconst doubled = arr.map(x => x * 2);\nconsole.log(doubled);",
              explanation: "map() 은 배열의 각 원소에 함수를 적용한 새 배열을 만듭니다. [1,2,3] 각각 2배는 [2,4,6].",
              options: [
                { id: "a", text: "[2, 4, 6]", correct: true },
                { id: "b", text: "[1, 2, 3]", correct: false },
                { id: "c", text: "6", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u3-l1-c5",
              conceptTags: ["list"],
              type: "FILL",
              language: "javascript",
              question: "배열에서 짝수만 걸러내도록 빈칸을 채우세요.",
              explanation: "filter() 는 조건을 만족하는 원소만 모아 새 배열을 만듭니다.",
              fillCode: "const arr = [1, 2, 3, 4, 5];\nconst evens = arr.{{0}}(x => x % 2 === 0);\nconsole.log(evens);",
              fillAnswers: [["filter"]],
            },
            {
              id: "js-u3-l1-c6",
              conceptTags: ["list"],
              type: "PARSONS",
              language: "javascript",
              question: "reduce() 로 배열의 합을 구하는 프로그램이 되도록 줄 순서를 맞추세요.",
              explanation: "reduce() 는 누적값(acc)에 각 원소(cur)를 계속 더해 나갑니다.",
              parsonsLines: [
                "const arr = [1, 2, 3, 4];",
                "const sum = arr.reduce((acc, cur) => acc + cur, 0);",
                "console.log(sum);",
              ],
            },
            {
              id: "js-u3-l1-c7",
              conceptTags: ["list", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question:
                "숫자를 오름차순 정렬해야 하는데 문자 기준으로 정렬되어 순서가 이상합니다(1, 10, 2). 버그를 고치세요.",
              explanation:
                "기본 sort() 는 문자열 기준으로 비교합니다. 숫자 기준으로 정렬하려면 sort((a, b) => a - b) 처럼 비교 함수를 넣어야 합니다.",
              starterCode: 'const arr = [10, 1, 2];\narr.sort();      // ← 버그\nconsole.log(arr.join(" "));\n',
              testCases: [{ expected: "1 2 10" }],
            },
            {
              id: "js-u3-l1-c8",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "정수 여러 개와 찾을 값을 입력받아(마지막 줄에 찾을 값), 배열에 포함되어 있으면 'true', 아니면 'false' 를 출력하세요.\n예시\n입력: 1 2 3\n2\n출력: true",
              explanation: "includes() 메서드로 배열에 값이 있는지 바로 확인할 수 있습니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "1 2 3\n2", expected: "true" },
                { stdin: "1 2 3\n9", expected: "false" },
                { stdin: "5 10 15\n15", expected: "true", hidden: true },
              ],
            },
            {
              id: "js-u3-l1-c9",
              conceptTags: ["list"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: "const [first, second] = [10, 20, 30];\nconsole.log(first + second);",
              explanation: "구조 분해 할당으로 first=10, second=20 이 되어 합은 30입니다.",
              options: [
                { id: "a", text: "30", correct: true },
                { id: "b", text: "1020", correct: false },
                { id: "c", text: "[10, 20, 30]", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u3-l1-c10",
              conceptTags: ["list", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "정수 여러 개를 입력받아 배열에 저장한 뒤, '-' 로 이어붙여 한 줄로 출력하세요.\n예시\n입력: 1 2 3\n출력: 1-2-3",
              explanation: "join(\"-\") 으로 배열의 원소들을 - 로 이어 붙일 수 있습니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "1 2 3", expected: "1-2-3" },
                { stdin: "5 10", expected: "5-10" },
                { stdin: "7", expected: "7", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "js-u4",
      order: 4,
      title: "유닛 4 · 문자열 메서드",
      description: "문자열을 자르고 변환하기",
      lessons: [
        {
          id: "js-u4-l1",
          title: "문자열 다루기",
          challenges: [
            {
              id: "js-u4-l1-c1",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 문자열의 길이를 출력하고, 문자열의 첫 번째 문자와 마지막 문자를 출력하는 프로그램을 작성하세요.\n예시\n입력: hello\n출력: 5\nh\no",
              explanation: "이 프로그램은 주어진 문자열의 길이를 구하고, 첫 번째 문자와 마지막 문자를 출력합니다. length 속성과 charAt 메서드를 사용하여 문자열을 처리합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "hello",
                  expected: "5\nh\no"
                },
                {
                  stdin: "CodingGoring",
                  expected: "12\nC\ng"
                },
                {
                  stdin: "JavaScript",
                  expected: "10\nJ\nt",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u4-l1-c3",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 문자열을 입력받아 모든 문자를 대문자로 변환한 후, 다시 소문자로 변환하여 출력하는 프로그램을 작성하세요.\n예시\n입력: Hello World\n출력: HELLO WORLD\nhello world",
              explanation: "이 문제는 주어진 문자열을 대문자와 소문자로 변환하는 간단한 작업입니다. toUpperCase() 메서드를 사용하여 모든 문자를 대문자로 변환하고, toLowerCase() 메서드를 사용하여 모든 문자를 소문자로 변환합니다. 변환된 문자열은 각각 출력됩니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "CodingGoring",
                  expected: "CODINGGORING\ncodinggoring"
                },
                {
                  stdin: "JavaScript",
                  expected: "JAVASCRIPT\njavascript"
                },
                {
                  stdin: "OpenAI",
                  expected: "OPENAI\nopenai",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u4-l1-c4",
              conceptTags: [
                "string"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 문자열의 대문자는 소문자로, 소문자는 대문자로 변환하여 출력하는 프로그램을 작성하세요.\n예시\n입력: HelloWorld\n출력: hELLOwORLD",
              explanation: "이 코드는 주어진 문자열을 한 글자씩 검사하여 대문자는 소문자로, 소문자는 대문자로 변환합니다. 변환된 결과는 최종적으로 출력됩니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "HelloWorld",
                  expected: "hELLOwORLD"
                },
                {
                  stdin: "CodingGoring",
                  expected: "cODINGgORING"
                },
                {
                  stdin: "JavaScript",
                  expected: "jAVAsCRIPT",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u4-l1-c5",
              conceptTags: ["string"],
              type: "SELECT",
              language: "javascript",
              question: "다음의 출력은?",
              codeSnippet: 'const s = "CodeRun";\nconsole.log(s.slice(0, 4));',
              explanation: "slice(0, 4) 는 인덱스 0부터 3까지(4는 포함 안 함)를 가져옵니다. 'Code'.",
              options: [
                { id: "a", text: "Code", correct: true },
                { id: "b", text: "Run", correct: false },
                { id: "c", text: "CodeR", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u4-l1-c6",
              conceptTags: ["string"],
              type: "FILL",
              language: "javascript",
              question: "문자열에 'Run' 이 포함되어 있는지 확인하도록 빈칸을 채우세요.",
              explanation: "특정 문자열이 포함되어 있는지 확인할 때는 includes() 를 사용합니다.",
              fillCode: 'const s = "CodeRun";\nconsole.log(s.{{0}}("Run"));',
              fillAnswers: [["includes"]],
            },
            {
              id: "js-u4-l1-c7",
              conceptTags: ["string"],
              type: "PARSONS",
              language: "javascript",
              question: "콤마로 구분된 문자열을 나눈 뒤 공백으로 다시 합쳐 출력하는 프로그램이 되도록 줄 순서를 맞추세요.",
              explanation: "split(구분자) 로 나눈 뒤, join(구분자) 로 다시 합칠 수 있습니다.",
              parsonsLines: ['const s = "a,b,c";', 'const parts = s.split(",");', 'console.log(parts.join(" "));'],
            },
            {
              id: "js-u4-l1-c8",
              conceptTags: ["string", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question: "공백을 제외한 길이(2)가 나와야 하는데 공백을 포함한 길이가 나옵니다. 버그를 고치세요.",
              explanation: "trim() 으로 양쪽 공백을 제거한 뒤 길이를 구해야 합니다. s.trim().length 로 고칩니다.",
              starterCode: 'const s = "  hi  ";\nconsole.log(s.length);      // ← 버그(공백 포함 길이가 나옴)\n',
              testCases: [{ expected: "2" }],
            },
            {
              id: "js-u4-l1-c9",
              conceptTags: ["string", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "문자열을 입력받아, 그 안의 모든 공백을 '_' 로 바꿔 출력하세요.\n예시\n입력: hello world\n출력: hello_world",
              explanation: 'replaceAll(" ", "_") 로 모든 공백을 바꿀 수 있습니다.',
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "hello world", expected: "hello_world" },
                { stdin: "a b c", expected: "a_b_c" },
                { stdin: "code", expected: "code", hidden: true },
              ],
            },
            {
              id: "js-u4-l1-c10",
              conceptTags: ["string"],
              type: "SELECT",
              language: "javascript",
              question: "다음의 출력은?",
              codeSnippet: 'console.log("ab".repeat(3));',
              explanation: "repeat(3) 은 문자열을 3번 반복합니다. 'ab'.repeat(3) = 'ababab'.",
              options: [
                { id: "a", text: "ababab", correct: true },
                { id: "b", text: "ab3", correct: false },
                { id: "c", text: "ab ab ab", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u4-l1-c11",
              conceptTags: ["string", "io"],
              type: "WRITE",
              language: "javascript",
              question: "문자열을 입력받아 거꾸로 뒤집어 출력하세요.\n예시\n입력: hello\n출력: olleh",
              explanation: 'split("").reverse().join("") 로 문자열을 뒤집을 수 있습니다.',
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "hello", expected: "olleh" },
                { stdin: "code", expected: "edoc" },
                { stdin: "a", expected: "a", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "js-u5",
      order: 5,
      title: "유닛 5 · 조건문 심화",
      description: "삼항 연산자와 복합 조건 다루기",
      lessons: [
        {
          id: "js-u5-l1",
          title: "조건 표현식",
          challenges: [
            {
              id: "js-u5-l1-c1",
              conceptTags: [
                "condition"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 정수가 짝수인지 홀수인지 판별하는 프로그램을 작성하세요. 삼항 연산자(?:)를 사용하여 결과를 출력해야 합니다.\n예시\n입력: 10\n출력: 짝수",
              explanation: "이 코드는 입력된 정수 N을 기준으로 짝수인지 홀수인지 판단합니다. N을 2로 나눈 나머지가 0이면 짝수, 그렇지 않으면 홀수입니다. 삼항 연산자를 사용하여 조건에 따라 결과를 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "5",
                  expected: "홀수"
                },
                {
                  stdin: "14",
                  expected: "짝수"
                },
                {
                  stdin: "0",
                  expected: "짝수",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u5-l1-c2",
              conceptTags: [
                "condition"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 숫자에 따라 그 숫자가 양수, 음수, 또는 0인지 판별하는 프로그램을 작성하세요.\n예시\n입력: 5\n출력: 양수",
              explanation: "이 문제는 주어진 숫자가 양수인지 음수인지 또는 0인지 판별하는 간단한 조건문을 사용하는 연습입니다. 'if', 'else if', 'else' 구조를 사용하여 다양한 조건을 검사하는 방법을 배울 수 있습니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "10",
                  expected: "양수"
                },
                {
                  stdin: "-3",
                  expected: "음수"
                },
                {
                  stdin: "0",
                  expected: "제로",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u5-l1-c3",
              conceptTags: [
                "condition"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 두 개의 정수 A와 B에 대해, A가 10보다 크고 B가 20보다 작으면 '조건을 만족합니다'를 출력하고, A가 10보다 작거나 B가 20보다 크면 '조건을 만족하지 않습니다'를 출력하는 프로그램을 작성하세요.\n예시\n입력: 15 18\n출력: 조건을 만족합니다",
              explanation: "이 문제는 논리 연산자 &&와 ||를 사용하여 복합 조건을 판별하는 방법을 연습하는 것입니다. 주어진 두 정수 A와 B에 대해 각 조건을 확인하고 적절한 출력을 합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "15 18",
                  expected: "조건을 만족합니다"
                },
                {
                  stdin: "5 25",
                  expected: "조건을 만족하지 않습니다"
                },
                {
                  stdin: "12 22",
                  expected: "조건을 만족하지 않습니다",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u5-l1-c4",
              conceptTags: ["condition"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: 'const x = 7;\nconst result = x % 2 === 0 ? "짝" : "홀";\nconsole.log(result);',
              explanation: "7 % 2 는 1이라 0이 아니므로 삼항 연산자의 거짓(:) 부분인 '홀' 이 선택됩니다.",
              options: [
                { id: "a", text: "홀", correct: true },
                { id: "b", text: "짝", correct: false },
                { id: "c", text: "7", correct: false },
                { id: "d", text: "undefined", correct: false },
              ],
            },
            {
              id: "js-u5-l1-c5",
              conceptTags: ["condition"],
              type: "FILL",
              language: "javascript",
              question: "조건이 거짓일 때 'B' 가 반환되도록 빈칸을 채우세요.",
              explanation: "삼항 연산자는 조건 ? 참일때값 : 거짓일때값 형태입니다.",
              fillCode: 'const result = false ? "A" {{0}} "B";\nconsole.log(result);',
              fillAnswers: [[":"]],
            },
            {
              id: "js-u5-l1-c6",
              conceptTags: ["condition"],
              type: "PARSONS",
              language: "javascript",
              question: "점수에 따라 A/B/C 등급을 출력하도록 줄 순서를 맞추세요 (90 이상 A, 80 이상 B, 나머지 C).",
              explanation: "조건은 위에서부터 순서대로 검사되며, 처음 참인 조건의 블록만 실행됩니다.",
              parsonsLines: [
                "const score = 75;",
                "if (score >= 90) {",
                '  console.log("A");',
                "} else if (score >= 80) {",
                '  console.log("B");',
                "} else {",
                '  console.log("C");',
                "}",
              ],
            },
            {
              id: "js-u5-l1-c7",
              conceptTags: ["condition", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question:
                "점수가 60~100 범위일 때만 '합격' 이 출력되어야 하는데, 범위를 벗어나도 항상 합격이 나옵니다. 버그를 고치세요.",
              explanation: "두 조건을 모두 만족해야 하므로 || 대신 && 를 사용해야 합니다.",
              starterCode:
                'const score = 150;\nif (score >= 60 || score <= 100) {  // ← 버그\n  console.log("합격");\n} else {\n  console.log("불합격");\n}\n',
              testCases: [{ expected: "불합격" }],
            },
            {
              id: "js-u5-l1-c8",
              conceptTags: ["condition", "io"],
              type: "WRITE",
              language: "javascript",
              question: "정수를 입력받아 0보다 크면 '양수', 그렇지 않으면 '양수 아님' 을 삼항 연산자로 판별해 출력하세요.",
              explanation: "n > 0 ? '양수' : '양수 아님' 형태로 작성합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "5", expected: "양수" },
                { stdin: "-3", expected: "양수 아님" },
                { stdin: "0", expected: "양수 아님", hidden: true },
              ],
            },
            {
              id: "js-u5-l1-c9",
              conceptTags: ["condition"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: 'const name = null;\nconsole.log(name ?? "이름 없음");',
              explanation:
                "?? 는 왼쪽 값이 null 또는 undefined 일 때만 오른쪽 값을 사용합니다. name 이 null 이므로 '이름 없음' 이 출력됩니다.",
              options: [
                { id: "a", text: "이름 없음", correct: true },
                { id: "b", text: "null", correct: false },
                { id: "c", text: "undefined", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u5-l1-c10",
              conceptTags: ["condition", "io"],
              type: "WRITE",
              language: "javascript",
              question: "세 정수를 입력받아 그 중 가장 큰 값을 출력하세요.",
              explanation: "Math.max() 를 쓰거나 삼항 연산자를 중첩해 직접 비교해도 됩니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "3 7 5", expected: "7" },
                { stdin: "10 2 8", expected: "10" },
                { stdin: "1 1 1", expected: "1", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "js-u6",
      order: 6,
      title: "유닛 6 · 반복문 심화",
      description: "while과 중첩 반복문 다루기",
      lessons: [
        {
          id: "js-u6-l1",
          title: "while과 중첩 반복",
          challenges: [
            {
              id: "js-u6-l1-c1",
              conceptTags: [
                "loop"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 정수 n에 대해 1부터 n까지의 합을 구하는 프로그램을 작성하세요. while 반복문을 사용해야 합니다.\n예시\n입력: 5\n출력: 15",
              explanation: "이 프로그램은 while 반복문을 사용하여 1부터 n까지의 모든 정수를 더하여 합을 구합니다. 초기값을 0으로 설정한 sum 변수에 반복문을 통해 값을 더하고, i는 1부터 시작하여 n까지 증가합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "10",
                  expected: "55"
                },
                {
                  stdin: "20",
                  expected: "210",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u6-l1-c2",
              conceptTags: [
                "loop"
              ],
              type: "WRITE",
              language: "javascript",
              question: "자바스크립트를 사용하여 1부터 9까지의 구구단을 출력하는 프로그램을 작성하세요. 각 단은 한 줄에 출력되어야 하며, 각 곱셈 결과는 공백으로 구분되어야 합니다.\n예시\n입력: (없음)\n출력: 1 x 1 = 1 1 x 2 = 2 1 x 3 = 3 1 x 4 = 4 1 x 5 = 5 1 x 6 = 6 1 x 7 = 7 1 x 8 = 8 1 x 9 = 9\n2 x 1 = 2 2 x 2 = 4 2 x 3 = 6 2 x 4 = 8 2 x 5 = 10 2 x 6 = 12 2 x 7 = 14 2 x 8 = 16 2 x 9 = 18\n3 x 1 = 3 3 x 2 = 6 3 x 3 = 9 3 x 4 = 12 3 x 5 = 15 3 x 6 = 18 3 x 7 = 21 3 x 8 = 24 3 x 9 = 27\n4 x 1 = 4 4 x 2 = 8 4 x 3 = 12 4 x 4 = 16 4 x 5 = 20 4 x 6 = 24 4 x 7 = 28 4 x 8 = 32 4 x 9 = 36\n5 x 1 = 5 5 x 2 = 10 5 x 3 = 15 5 x 4 = 20 5 x 5 = 25 5 x 6 = 30 5 x 7 = 35 5 x 8 = 40 5 x 9 = 45\n6 x 1 = 6 6 x 2 = 12 6 x 3 = 18 6 x 4 = 24 6 x 5 = 30 6 x 6 = 36 6 x 7 = 42 6 x 8 = 48 6 x 9 = 54\n7 x 1 = 7 7 x 2 = 14 7 x 3 = 21 7 x 4 = 28 7 x 5 = 35 7 x 6 = 42 7 x 7 = 49 7 x 8 = 56 7 x 9 = 63\n8 x 1 = 8 8 x 2 = 16 8 x 3 = 24 8 x 4 = 32 8 x 5 = 40 8 x 6 = 48 8 x 7 = 56 8 x 8 = 64 8 x 9 = 72\n9 x 1 = 9 9 x 2 = 18 9 x 3 = 27 9 x 4 = 36 9 x 5 = 45 9 x 6 = 54 9 x 7 = 63 9 x 8 = 72 9 x 9 = 81",
              explanation: "이 문제는 중첩 반복문을 사용하여 구구단을 출력하는 방법을 연습하는 것입니다. 외부 반복문은 단을 나타내고, 내부 반복문은 각 단의 곱셈을 수행하여 결과를 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  expected: "1 x 1 = 1 1 x 2 = 2 1 x 3 = 3 1 x 4 = 4 1 x 5 = 5 1 x 6 = 6 1 x 7 = 7 1 x 8 = 8 1 x 9 = 9\n2 x 1 = 2 2 x 2 = 4 2 x 3 = 6 2 x 4 = 8 2 x 5 = 10 2 x 6 = 12 2 x 7 = 14 2 x 8 = 16 2 x 9 = 18\n3 x 1 = 3 3 x 2 = 6 3 x 3 = 9 3 x 4 = 12 3 x 5 = 15 3 x 6 = 18 3 x 7 = 21 3 x 8 = 24 3 x 9 = 27\n4 x 1 = 4 4 x 2 = 8 4 x 3 = 12 4 x 4 = 16 4 x 5 = 20 4 x 6 = 24 4 x 7 = 28 4 x 8 = 32 4 x 9 = 36\n5 x 1 = 5 5 x 2 = 10 5 x 3 = 15 5 x 4 = 20 5 x 5 = 25 5 x 6 = 30 5 x 7 = 35 5 x 8 = 40 5 x 9 = 45\n6 x 1 = 6 6 x 2 = 12 6 x 3 = 18 6 x 4 = 24 6 x 5 = 30 6 x 6 = 36 6 x 7 = 42 6 x 8 = 48 6 x 9 = 54\n7 x 1 = 7 7 x 2 = 14 7 x 3 = 21 7 x 4 = 28 7 x 5 = 35 7 x 6 = 42 7 x 7 = 49 7 x 8 = 56 7 x 9 = 63\n8 x 1 = 8 8 x 2 = 16 8 x 3 = 24 8 x 4 = 32 8 x 5 = 40 8 x 6 = 48 8 x 7 = 56 8 x 8 = 64 8 x 9 = 72\n9 x 1 = 9 9 x 2 = 18 9 x 3 = 27 9 x 4 = 36 9 x 5 = 45 9 x 6 = 54 9 x 7 = 63 9 x 8 = 72 9 x 9 = 81"
                }
              ]
            },
            {
              id: "js-u6-l1-c3",
              conceptTags: [
                "loop",
                "condition"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 정수가 소수인지 판별하는 함수를 작성하세요. 소수는 1과 자기 자신만으로 나누어 떨어지는 1보다 큰 자연수입니다.\n예시\n입력: 7\n출력: YES",
              explanation: "이 코드는 주어진 정수 N이 소수인지 판별합니다. 2부터 N의 제곱근까지의 모든 정수로 N을 나누어 떨어지는지 확인하여, 하나라도 나누어 떨어지면 소수가 아니므로 'NO'를 반환하고, 그렇지 않으면 'YES'를 반환합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "11",
                  expected: "YES"
                },
                {
                  stdin: "15",
                  expected: "NO"
                },
                {
                  stdin: "1",
                  expected: "NO",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u6-l1-c4",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력 줄 수는 몇 줄인가요?",
              codeSnippet: "let i = 0;\nwhile (i < 3) {\n  console.log(i);\n  i++;\n}",
              explanation: "i 가 0,1,2 일 때 조건 i<3 이 참이라 3번 반복하며 출력합니다.",
              options: [
                { id: "a", text: "3", correct: true },
                { id: "b", text: "2", correct: false },
                { id: "c", text: "4", correct: false },
                { id: "d", text: "무한 반복", correct: false },
              ],
            },
            {
              id: "js-u6-l1-c5",
              conceptTags: ["loop"],
              type: "FILL",
              language: "javascript",
              question: "1부터 10까지 출력되도록 빈칸을 채우세요.",
              explanation: "i <= 10 이면 1부터 10까지 반복합니다.",
              fillCode: "for (let i = 1; i <= {{0}}; i++) {\n  console.log(i);\n}",
              fillAnswers: [["10"]],
            },
            {
              id: "js-u6-l1-c6",
              conceptTags: ["loop"],
              type: "PARSONS",
              language: "javascript",
              question: "5부터 1까지 거꾸로 출력하도록 줄 순서를 맞추세요.",
              explanation: "i 를 5부터 시작해 1씩 줄여가며 1이 될 때까지 반복합니다.",
              parsonsLines: ["let i = 5;", "while (i >= 1) {", "  console.log(i);", "  i--;", "}"],
            },
            {
              id: "js-u6-l1-c7",
              conceptTags: ["loop", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question: "1부터 5까지 출력해야 하는데 5가 빠집니다. 버그를 고치세요.",
              explanation: "i < 5 는 5를 포함하지 않습니다. i <= 5 로 고쳐야 5까지 출력됩니다.",
              starterCode: "let i = 1;\nwhile (i < 5) {  // ← 버그\n  console.log(i);\n  i++;\n}\n",
              testCases: [{ expected: "1\n2\n3\n4\n5" }],
            },
            {
              id: "js-u6-l1-c8",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "javascript",
              question: "정수 n을 입력받아 1부터 n까지 한 줄에 하나씩 출력하세요.",
              explanation: "for (let i = 1; i <= n; i++) 로 반복하며 각 값을 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "3", expected: "1\n2\n3" },
                { stdin: "1", expected: "1" },
                { stdin: "5", expected: "1\n2\n3\n4\n5", hidden: true },
              ],
            },
            {
              id: "js-u6-l1-c9",
              conceptTags: ["loop"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드가 마지막으로 출력하는 값은?",
              codeSnippet: "for (let i = 0; i < 10; i++) {\n  if (i === 3) {\n    break;\n  }\n  console.log(i);\n}",
              explanation: "i가 3이 되면 break로 반복이 즉시 멈추므로, 그 직전인 2까지만 출력됩니다.",
              options: [
                { id: "a", text: "2", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "9", correct: false },
                { id: "d", text: "아무것도 출력 안 됨", correct: false },
              ],
            },
            {
              id: "js-u6-l1-c10",
              conceptTags: ["loop", "io"],
              type: "WRITE",
              language: "javascript",
              question: "정수 n을 입력받아 1부터 n까지의 짝수의 합을 출력하세요.",
              explanation: "반복문을 돌며 2로 나눈 나머지가 0인 값만 더합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "10", expected: "30" },
                { stdin: "5", expected: "6" },
                { stdin: "1", expected: "0", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "js-u7",
      order: 7,
      title: "유닛 7 · 재귀 함수",
      description: "함수가 자기 자신을 호출해 문제를 나눠 풀기",
      lessons: [
        {
          id: "js-u7-l1",
          title: "재귀로 풀기",
          challenges: [
            {
              id: "js-u7-l1-c1",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 정수 n의 팩토리얼을 계산하는 재귀 함수를 작성하세요. 팩토리얼은 n!로 표현되며, n! = n × (n-1)!입니다. 기본적으로 0! = 1입니다.\n예시\n입력: 5\n출력: 120",
              explanation: "이 코드는 재귀 함수를 사용하여 팩토리얼을 계산합니다. n이 0일 때 1을 반환하고, 그 외의 경우 n과 n-1의 팩토리얼을 곱하여 반환합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "1"
                },
                {
                  stdin: "3",
                  expected: "6"
                },
                {
                  stdin: "4",
                  expected: "24",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u7-l1-c2",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 n에 대해 n번째 피보나치 수를 구하는 재귀 함수를 작성하세요. 피보나치 수열은 0번째 항이 0, 1번째 항이 1이며, 그 이후의 항은 이전 두 항의 합으로 정의됩니다.\n예시\n입력: 5\n출력: 5",
              explanation: "이 코드는 피보나치 수를 재귀적으로 계산합니다. n이 0일 때는 0을 반환하고, n이 1일 때는 1을 반환합니다. 그 외의 경우에는 n-1과 n-2의 피보나치 수를 더하여 반환합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "0",
                  expected: "0"
                },
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "6",
                  expected: "8",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u7-l1-c3",
              conceptTags: [
                "recursion"
              ],
              type: "WRITE",
              language: "javascript",
              question: "재귀 함수를 사용하여 1부터 n까지의 합을 구하는 함수를 작성하세요.\n예시\n입력: 5\n출력: 15",
              explanation: "이 함수는 재귀적으로 n이 1일 때까지 호출되며, 각 호출에서 n을 더하여 최종적으로 1부터 n까지의 합을 계산합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "1",
                  expected: "1"
                },
                {
                  stdin: "10",
                  expected: "55"
                },
                {
                  stdin: "100",
                  expected: "5050",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u7-l1-c4",
              conceptTags: ["recursion"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: "function f(n) {\n  if (n === 0) return 0;\n  return n + f(n - 1);\n}\nconsole.log(f(3));",
              explanation: "f(3) = 3 + f(2) = 3+2+f(1) = 3+2+1+f(0) = 6.",
              options: [
                { id: "a", text: "6", correct: true },
                { id: "b", text: "3", correct: false },
                { id: "c", text: "0", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u7-l1-c5",
              conceptTags: ["recursion"],
              type: "FILL",
              language: "javascript",
              question: "n이 0일 때 1을 반환하도록(팩토리얼의 기저 조건) 빈칸을 채우세요.",
              explanation: "0! 은 1로 정의되므로 기저 조건에서 1을 반환해야 합니다.",
              fillCode: "function factorial(n) {\n  if (n === 0) return {{0}};\n  return n * factorial(n - 1);\n}",
              fillAnswers: [["1"]],
            },
            {
              id: "js-u7-l1-c6",
              conceptTags: ["recursion"],
              type: "PARSONS",
              language: "javascript",
              question: "n부터 1까지 출력한 뒤 재귀를 멈추는 함수가 되도록 줄 순서를 맞추세요.",
              explanation: "n이 0이 되면 return 으로 재귀를 멈추고, 그 전엔 출력 후 n-1 로 자신을 호출합니다.",
              parsonsLines: [
                "function countdown(n) {",
                "  if (n === 0) {",
                "    return;",
                "  }",
                "  console.log(n);",
                "  countdown(n - 1);",
                "}",
              ],
            },
            {
              id: "js-u7-l1-c7",
              conceptTags: ["recursion", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question: "0! 은 1이어야 하는데 기저 조건이 잘못되어 항상 0이 출력됩니다. 버그를 고치세요.",
              explanation: "곱셈의 기저 조건은 0이 아니라 1이어야 합니다.",
              starterCode:
                "function factorial(n) {\n  if (n === 0) return 0;      // ← 버그\n  return n * factorial(n - 1);\n}\nconsole.log(factorial(4));\n",
              testCases: [{ expected: "24" }],
            },
            {
              id: "js-u7-l1-c8",
              conceptTags: ["recursion", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "정수 x와 n(0 이상)을 입력받아, 재귀 함수로 x의 n제곱을 계산해 출력하세요.\n예시\n입력: 2 5\n출력: 32",
              explanation: "기저 조건 n===0 이면 1을 반환하고, 그 외엔 x * power(x, n-1) 을 반환합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "2 5", expected: "32" },
                { stdin: "3 0", expected: "1" },
                { stdin: "5 2", expected: "25", hidden: true },
              ],
            },
            {
              id: "js-u7-l1-c9",
              conceptTags: ["recursion"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: "function rec(n) {\n  if (n <= 1) return 1;\n  return rec(n - 1) + rec(n - 2);\n}\nconsole.log(rec(4));",
              explanation: "rec(4) = rec(3)+rec(2) = 3+2 = 5 입니다 (기저 조건: n<=1 이면 1).",
              options: [
                { id: "a", text: "5", correct: true },
                { id: "b", text: "4", correct: false },
                { id: "c", text: "8", correct: false },
                { id: "d", text: "3", correct: false },
              ],
            },
            {
              id: "js-u7-l1-c10",
              conceptTags: ["recursion", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "0 이상의 정수를 입력받아 각 자릿수의 합을 재귀 함수로 구해 출력하세요.\n예시\n입력: 123\n출력: 6",
              explanation: "n이 한 자리 수(n < 10)면 n을 반환하고, 그 외엔 n%10 + digitSum(Math.floor(n/10)) 을 반환합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "123", expected: "6" },
                { stdin: "9", expected: "9" },
                { stdin: "1000", expected: "1", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "js-u8",
      order: 8,
      title: "유닛 8 · 예외 처리",
      description: "예외를 처리해 프로그램이 멈추지 않게 만들기",
      lessons: [
        {
          id: "js-u8-l1",
          title: "try-catch",
          challenges: [
            {
              id: "js-u8-l1-c1",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "javascript",
              question: "사용자로부터 입력받은 문자열을 숫자로 변환하는 프로그램을 작성하세요. 만약 변환할 수 없는 문자열이 입력되면, '변환 오류'라는 메시지를 출력해야 합니다. 자바스크립트의 try-catch 문을 사용하여 오류를 처리하세요.\n예시\n입력: 123abc\n출력: 변환 오류",
              explanation: "이 프로그램은 사용자가 입력한 문자열을 숫자로 변환하려고 시도합니다. 변환이 실패하면 catch 블록에서 '변환 오류' 메시지를 출력합니다. try-catch 문을 사용하여 오류를 안전하게 처리합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "456",
                  expected: "456"
                },
                {
                  stdin: "abc123",
                  expected: "변환 오류"
                },
                {
                  stdin: "78.9",
                  expected: "78.9",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u8-l1-c3",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "javascript",
              question: "사용자로부터 숫자를 입력받아 그 숫자가 유효한지 검증하는 프로그램을 작성하세요. 입력이 유효한 경우 그 숫자를 출력하고, 유효하지 않은 경우 '유효하지 않은 입력'을 출력하세요. 이때, try-catch-finally 문을 사용하여 예외 처리를 구현해야 합니다.\n예시\n입력: 42\n출력: 42",
              explanation: "이 코드는 사용자가 입력한 값을 숫자로 변환하고, 변환이 실패할 경우 예외를 발생시킵니다. try-catch-finally 블록을 사용하여 예외를 처리하고, 유효한 입력일 경우 숫자를 출력하며, 유효하지 않은 경우 '유효하지 않은 입력' 메시지를 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "3.14",
                  expected: "3.14"
                },
                {
                  stdin: "abc",
                  expected: "유효하지 않은 입력"
                },
                {
                  stdin: "-10",
                  expected: "-10",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u8-l1-c4",
              conceptTags: [
                "exception"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 문자열이 JSON 형식인지 확인하고, 잘못된 경우 에러를 처리하는 프로그램을 작성하세요.\n예시\n입력: {\"name\":\"홍길동\",\"age\":30}\n출력: {\"name\":\"홍길동\",\"age\":30}",
              explanation: "이 문제는 JSON.parse() 메서드를 사용하여 주어진 문자열을 객체로 변환하는 방법을 배우는 것입니다. 잘못된 형식의 JSON 문자열이 주어지면 SyntaxError가 발생하므로, try-catch 문을 사용하여 에러를 처리합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "{\"name\":\"이순신\",\"age\":40}",
                  expected: "{\"name\":\"이순신\",\"age\":40}"
                },
                {
                  stdin: "{\"name\":\"김유신\",\"age\":}",
                  expected: "잘못된 JSON 형식입니다."
                },
                {
                  stdin: "{\"name\":\"강감찬\",\"age\":50,}",
                  expected: "잘못된 JSON 형식입니다.",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u8-l1-c5",
              conceptTags: ["exception"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: 'try {\n  JSON.parse("abc");\n} catch (e) {\n  console.log("오류 발생");\n}',
              explanation: "'abc' 는 올바른 JSON이 아니라서 파싱 중 오류가 발생하고, catch 블록이 실행됩니다.",
              options: [
                { id: "a", text: "오류 발생", correct: true },
                { id: "b", text: "abc", correct: false },
                { id: "c", text: "undefined", correct: false },
                { id: "d", text: "아무것도 출력되지 않음", correct: false },
              ],
            },
            {
              id: "js-u8-l1-c6",
              conceptTags: ["exception"],
              type: "FILL",
              language: "javascript",
              question: "예외가 발생했을 때 처리하도록 빈칸을 채우세요.",
              explanation: "예외를 잡아내는 키워드는 catch 입니다.",
              fillCode: 'try {\n  null.value;\n} {{0}} (e) {\n  console.log("오류가 발생했습니다");\n}',
              fillAnswers: [["catch"]],
            },
            {
              id: "js-u8-l1-c7",
              conceptTags: ["exception"],
              type: "PARSONS",
              language: "javascript",
              question: "값을 확인하고, 오류가 나면 메시지를, 항상 마지막엔 '완료' 를 출력하도록 줄 순서를 맞추세요.",
              explanation: "finally 블록은 예외 발생 여부와 상관없이 항상 실행됩니다.",
              parsonsLines: [
                "try {",
                '  console.log("확인 중");',
                "} catch (e) {",
                '  console.log("오류");',
                "} finally {",
                '  console.log("완료");',
                "}",
              ],
            },
            {
              id: "js-u8-l1-c8",
              conceptTags: ["exception", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question: "숫자로 변환할 수 없으면 '변환 실패' 가 나와야 하는데 NaN 이 출력됩니다. 버그를 고치세요.",
              explanation:
                "Number('abc') 는 예외를 던지지 않고 NaN 을 반환합니다. try/catch 대신 isNaN() 으로 직접 확인해야 합니다.",
              starterCode:
                'function parseNum(s) {\n  try {\n    return Number(s) * 2;      // ← 버그: NaN은 예외를 던지지 않음\n  } catch (e) {\n    return "변환 실패";\n  }\n}\nconsole.log(parseNum("abc"));\n',
              testCases: [{ expected: "변환 실패" }],
            },
            {
              id: "js-u8-l1-c9",
              conceptTags: ["exception", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "정수 두 개를 입력받아 첫 번째를 두 번째로 나눈 값을 출력하세요. 두 번째 수가 0이면 '0으로 나눌 수 없습니다' 를 출력하세요.\n예시\n입력: 10\n0\n출력: 0으로 나눌 수 없습니다",
              explanation: "자바스크립트는 0으로 나눠도 예외를 던지지 않으므로, if 문으로 직접 검사해야 합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "10\n2", expected: "5" },
                { stdin: "7\n0", expected: "0으로 나눌 수 없습니다" },
                { stdin: "20\n4", expected: "5", hidden: true },
              ],
            },
            {
              id: "js-u8-l1-c10",
              conceptTags: ["exception"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: 'try {\n  throw new Error("문제 발생");\n} catch (e) {\n  console.log(e.message);\n}',
              explanation: "throw 로 던진 Error 객체의 메시지는 e.message 로 꺼낼 수 있습니다.",
              options: [
                { id: "a", text: "문제 발생", correct: true },
                { id: "b", text: "Error", correct: false },
                { id: "c", text: "undefined", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u8-l1-c11",
              conceptTags: ["exception", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "문자열을 입력받아 정수로 변환한 뒤 2배를 출력하세요. 변환할 수 없으면 '변환 실패' 를 출력하세요.",
              explanation: "Number() 로 변환한 뒤 isNaN() 으로 실패 여부를 확인합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "5", expected: "10" },
                { stdin: "abc", expected: "변환 실패" },
                { stdin: "-3", expected: "-6", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "js-u9",
      order: 9,
      title: "유닛 9 · 정렬과 탐색",
      description: "배열을 정렬하고 원하는 값을 찾기",
      lessons: [
        {
          id: "js-u9-l1",
          title: "정렬·탐색 기초",
          challenges: [
            {
              id: "js-u9-l1-c1",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 배열을 오름차순으로 정렬하는 버블 정렬 알고리즘을 구현하세요.\n예시\n입력: 5\n5 3 8 1 2\n출력: 1 2 3 5 8",
              explanation: "이 문제는 버블 정렬 알고리즘을 사용하여 배열을 오름차순으로 정렬하는 방법을 배울 수 있습니다. 버블 정렬은 인접한 두 요소를 비교하고 필요에 따라 교환하는 방식으로 동작합니다. 이 과정을 반복하여 모든 요소가 정렬될 때까지 진행합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "3\n3 1 2",
                  expected: "1 2 3"
                },
                {
                  stdin: "4\n4 4 4 4",
                  expected: "4 4 4 4"
                },
                {
                  stdin: "6\n10 5 3 2 8 1",
                  expected: "1 2 3 5 8 10",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u9-l1-c2",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 배열에서 특정 값을 선형 탐색을 통해 찾는 함수를 작성하세요. 값이 배열에 존재하면 그 인덱스를 반환하고, 존재하지 않으면 -1을 반환해야 합니다.\n예시\n입력: 5\n1 2 3 4 5\n3\n출력: 2",
              explanation: "이 코드는 배열에서 특정 값을 선형 탐색으로 찾습니다. 배열을 순회하면서 각 요소가 찾고자 하는 값과 일치하는지 확인하고, 일치하면 그 인덱스를 반환합니다. 배열의 끝까지 탐색한 후에도 값을 찾지 못하면 -1을 반환합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "5\n1 2 3 4 5\n3",
                  expected: "2"
                },
                {
                  stdin: "4\n10 20 30 40\n25",
                  expected: "-1"
                },
                {
                  stdin: "3\n5 15 25\n15",
                  expected: "1",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u9-l1-c3",
              conceptTags: [
                "algorithm",
                "list"
              ],
              type: "WRITE",
              language: "javascript",
              question: "정렬된 배열에서 특정 값을 찾기 위해 이진 탐색 알고리즘을 구현하세요.\n예시\n입력: 5\n1 3 5 7 9\n5\n출력: 2",
              explanation: "이진 탐색 알고리즘은 정렬된 배열에서 특정 값을 찾기 위해 배열의 중간 값을 비교하여 탐색 범위를 반으로 줄여 나가는 방법입니다. 이 코드는 입력으로 주어진 배열과 찾고자 하는 값을 바탕으로 이진 탐색을 수행하여 결과를 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "5\n1 3 5 7 9\n3",
                  expected: "1"
                },
                {
                  stdin: "6\n2 4 6 8 10 12\n10",
                  expected: "4"
                },
                {
                  stdin: "4\n10 20 30 40\n25",
                  expected: "-1",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u9-l1-c4",
              conceptTags: ["algorithm", "list"],
              type: "SELECT",
              language: "javascript",
              question: "다음의 출력은?",
              codeSnippet:
                'const arr = [3, 1, 2];\nlet temp;\nif (arr[0] > arr[1]) {\n  temp = arr[0];\n  arr[0] = arr[1];\n  arr[1] = temp;\n}\nconsole.log(arr.join(" "));',
              explanation: "arr[0](3) 이 arr[1](1) 보다 크므로 두 값을 맞바꿔 1 3 2 가 됩니다.",
              options: [
                { id: "a", text: "1 3 2", correct: true },
                { id: "b", text: "3 1 2", correct: false },
                { id: "c", text: "1 2 3", correct: false },
                { id: "d", text: "2 1 3", correct: false },
              ],
            },
            {
              id: "js-u9-l1-c5",
              conceptTags: ["algorithm"],
              type: "FILL",
              language: "javascript",
              question: "오름차순 정렬을 위해 인접한 두 값의 순서가 잘못됐는지 확인하도록 빈칸을 채우세요.",
              explanation: "오름차순 정렬에서는 앞의 값이 뒤의 값보다 크면(>) 순서가 잘못된 것이므로 교환합니다.",
              fillCode: "if (arr[i] {{0}} arr[i + 1]) {\n  // swap\n}",
              fillAnswers: [[">"]],
            },
            {
              id: "js-u9-l1-c6",
              conceptTags: ["algorithm", "list"],
              type: "PARSONS",
              language: "javascript",
              question: "배열에서 특정 값을 찾아 인덱스를 출력하는 프로그램이 되도록 줄 순서를 맞추세요 (없으면 -1).",
              explanation: "배열을 순회하며 찾는 값과 같은 인덱스를 idx 에 저장합니다.",
              parsonsLines: [
                "const arr = [5, 3, 8, 1];",
                "const target = 8;",
                "let idx = -1;",
                "for (let i = 0; i < arr.length; i++) {",
                "  if (arr[i] === target) {",
                "    idx = i;",
                "  }",
                "}",
                "console.log(idx);",
              ],
            },
            {
              id: "js-u9-l1-c7",
              conceptTags: ["algorithm", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question: "배열의 마지막 원소를 못 찾는 버그가 있습니다. target(4)의 인덱스가 나오도록 고치세요.",
              explanation: "반복 조건이 i < 3 이면 마지막 인덱스(3)를 검사하지 못합니다. i < arr.length(4) 로 고쳐야 합니다.",
              starterCode:
                "const arr = [1, 2, 3, 4];\nconst target = 4;\nlet idx = -1;\nfor (let i = 0; i < 3; i++) {  // ← 버그\n  if (arr[i] === target) {\n    idx = i;\n  }\n}\nconsole.log(idx);\n",
              testCases: [{ expected: "3" }],
            },
            {
              id: "js-u9-l1-c8",
              conceptTags: ["algorithm", "list", "io"],
              type: "WRITE",
              language: "javascript",
              question: "정수 n개를 입력받아, 평균보다 큰 값의 개수를 출력하세요.\n예시\n입력: 5\n1 2 3 4 5\n출력: 2",
              explanation: "먼저 평균을 구한 뒤, 배열을 다시 순회하며 평균보다 큰 값의 개수를 셉니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "5\n1 2 3 4 5", expected: "2" },
                { stdin: "3\n10 20 30", expected: "1" },
                { stdin: "4\n1 1 1 1", expected: "0", hidden: true },
              ],
            },
            {
              id: "js-u9-l1-c9",
              conceptTags: ["algorithm"],
              type: "SELECT",
              language: "javascript",
              question: "다음의 출력은?",
              codeSnippet: "const low = 0, high = 9;\nconst mid = Math.floor((low + high) / 2);\nconsole.log(mid);",
              explanation: "(0 + 9) / 2 는 4.5이고, Math.floor() 로 소수점을 버리면 4가 됩니다.",
              options: [
                { id: "a", text: "4", correct: true },
                { id: "b", text: "5", correct: false },
                { id: "c", text: "4.5", correct: false },
                { id: "d", text: "9", correct: false },
              ],
            },
            {
              id: "js-u9-l1-c10",
              conceptTags: ["algorithm", "list", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "정수 n개를 입력받아 오름차순으로 정렬한 뒤, 공백으로 구분해 출력하세요.\n예시\n입력: 5\n5 3 8 1 2\n출력: 1 2 3 5 8",
              explanation: "sort((a, b) => a - b) 로 숫자를 오름차순 정렬한 뒤 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "5\n5 3 8 1 2", expected: "1 2 3 5 8" },
                { stdin: "3\n3 1 2", expected: "1 2 3" },
                { stdin: "4\n4 4 4 4", expected: "4 4 4 4", hidden: true },
              ],
            },
          ]
        }
      ]
    },
    {
      id: "js-u10",
      order: 10,
      title: "유닛 10 · 종합 응용",
      description: "배운 개념을 조합해 풀어보는 응용 문제",
      lessons: [
        {
          id: "js-u10-l1",
          title: "종합 문제",
          challenges: [
            {
              id: "js-u10-l1-c1",
              conceptTags: [
                "function",
                "list"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 배열에서 중복된 값을 제거하고, 중복이 제거된 배열을 반환하는 함수를 작성하세요.\n예시\n입력: 5\n3 1 2 3 2\n출력: 1 2 3",
              explanation: "이 문제는 배열의 중복된 값을 제거하고 정렬하는 과정을 포함합니다. Set 객체를 사용하여 중복을 제거하고, sort 메서드를 사용하여 오름차순으로 정렬합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "6\n4 5 1 4 2 5",
                  expected: "1 2 4 5"
                },
                {
                  stdin: "4\n7 7 7 7",
                  expected: "7"
                },
                {
                  stdin: "3\n-1 -1 -1",
                  expected: "-1",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u10-l1-c2",
              conceptTags: [
                "loop"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 학생들의 점수를 포함한 객체 배열을 받아서 각 학생의 평균 점수를 계산하고, 평균 점수가 70 이상인 학생의 이름을 출력하는 프로그램을 작성하세요.\n예시\n입력: 3\n이순신:85,90,78\n강감찬:60,70,65\n홍길동:90,92,88\n출력: 이순신\n홍길동",
              explanation: "이 프로그램은 학생의 점수를 포함한 객체 배열을 입력받아 각 학생의 평균 점수를 계산합니다. 평균 점수가 70 이상인 학생의 이름을 배열에 추가하고, 최종적으로 그 이름들을 출력합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "2\n김철수:80,75,90\n이영희:60,65,70",
                  expected: "김철수"
                },
                {
                  stdin: "3\n박지민:50,60,55\n최수빈:80,85,90\n이민호:70,75,80",
                  expected: "최수빈\n이민호"
                },
                {
                  stdin: "1\n정우성:100,95,90",
                  expected: "정우성",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u10-l1-c3",
              conceptTags: [
                "condition",
                "list"
              ],
              type: "WRITE",
              language: "javascript",
              question: "주어진 배열에서 특정 숫자가 몇 번 나타나는지를 세는 함수를 작성하세요. 배열과 찾고자 하는 숫자를 입력으로 받아야 합니다.\n예시\n입력: 5\n1 2 3 2 4\n2\n출력: 2",
              explanation: "이 문제는 배열을 순회하면서 특정 숫자가 몇 번 나타나는지를 세는 간단한 문제입니다. 조건문을 사용하여 배열의 각 요소를 확인하고, 찾고자 하는 숫자와 일치할 경우 카운트를 증가시킵니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                {
                  stdin: "4\n1 1 1 1\n1",
                  expected: "4"
                },
                {
                  stdin: "6\n2 3 2 5 2 6\n2",
                  expected: "3"
                },
                {
                  stdin: "3\n7 8 9\n10",
                  expected: "0",
                  hidden: true
                }
              ]
            },
            {
              id: "js-u10-l1-c4",
              conceptTags: ["variable", "list"],
              type: "SELECT",
              language: "javascript",
              question: "다음의 출력은?",
              codeSnippet:
                'const items = [{ name: "pen", price: 1000 }, { name: "cup", price: 3000 }];\nconsole.log(items[1].price);',
              explanation: "items[1] 은 두 번째 원소(cup, 3000)이므로 .price 는 3000입니다.",
              options: [
                { id: "a", text: "3000", correct: true },
                { id: "b", text: "1000", correct: false },
                { id: "c", text: "cup", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u10-l1-c5",
              conceptTags: ["condition"],
              type: "FILL",
              language: "javascript",
              question: "3과 5 모두의 배수인지 확인하도록 빈칸을 채우세요.",
              explanation: "두 조건을 모두 만족해야 하므로 && 를 사용합니다.",
              fillCode: 'if (n % 3 === 0 {{0}} n % 5 === 0) {\n  console.log("FizzBuzz");\n}',
              fillAnswers: [["&&"]],
            },
            {
              id: "js-u10-l1-c6",
              conceptTags: ["function", "loop"],
              type: "PARSONS",
              language: "javascript",
              question: "1부터 n까지 제곱의 합을 구하는 함수를 만들어 호출하는 프로그램이 되도록 줄 순서를 맞추세요.",
              explanation: "1²+2²+3² = 1+4+9 = 14 를 반환합니다.",
              parsonsLines: [
                "function sumOfSquares(n) {",
                "  let total = 0;",
                "  for (let i = 1; i <= n; i++) {",
                "    total += i * i;",
                "  }",
                "  return total;",
                "}",
                "console.log(sumOfSquares(3));",
              ],
            },
            {
              id: "js-u10-l1-c7",
              conceptTags: ["string", "loop", "debug"],
              type: "BUGFIX",
              language: "javascript",
              question:
                "'banana' 에서 'a' 의 개수를 세는데 마지막 글자를 놓쳐 3이 아니라 2가 나옵니다. 버그를 고치세요.",
              explanation: "'banana' 는 길이가 6이므로 반복 조건은 i < 6(또는 s.length) 이어야 합니다.",
              starterCode:
                'const s = "banana";\nlet count = 0;\nfor (let i = 0; i < 5; i++) {  // ← 버그\n  if (s[i] === "a") {\n    count++;\n  }\n}\nconsole.log(count);\n',
              testCases: [{ expected: "3" }],
            },
            {
              id: "js-u10-l1-c8",
              conceptTags: ["loop", "condition", "io"],
              type: "WRITE",
              language: "javascript",
              question: "정수 n개를 입력받아, 그 중 3의 배수의 개수를 출력하세요.\n예시\n입력: 5\n3 4 6 7 9\n출력: 3",
              explanation: "각 값을 3으로 나눈 나머지가 0인지 확인하며 개수를 셉니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "5\n3 4 6 7 9", expected: "3" },
                { stdin: "3\n1 2 4", expected: "0" },
                { stdin: "4\n3 3 3 3", expected: "4", hidden: true },
              ],
            },
            {
              id: "js-u10-l1-c9",
              conceptTags: ["list", "function"],
              type: "SELECT",
              language: "javascript",
              question: "다음 코드의 출력은?",
              codeSnippet: "function increment(arr) {\n  arr[0]++;\n}\nconst a = [5];\nincrement(a);\nconsole.log(a[0]);",
              explanation:
                "배열은 객체이므로 함수에 넘겨도 같은 배열을 가리킵니다. 함수 안에서 바꾼 값이 그대로 반영되어 6이 출력됩니다.",
              options: [
                { id: "a", text: "6", correct: true },
                { id: "b", text: "5", correct: false },
                { id: "c", text: "0", correct: false },
                { id: "d", text: "오류가 납니다", correct: false },
              ],
            },
            {
              id: "js-u10-l1-c10",
              conceptTags: ["loop", "condition", "io"],
              type: "WRITE",
              language: "javascript",
              question:
                "정수 n을 입력받아 1부터 n까지, 3의 배수면 'Fizz', 5의 배수면 'Buzz', 둘 다면 'FizzBuzz', 그 외엔 숫자 자체를 한 줄씩 출력하세요.",
              explanation: "15의 배수(3과 5 모두의 배수) 여부를 먼저 확인한 뒤, 3의 배수, 5의 배수, 그 외 순서로 검사합니다.",
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [
                { stdin: "5", expected: "1\n2\nFizz\n4\nBuzz" },
                { stdin: "3", expected: "1\n2\nFizz" },
                {
                  stdin: "15",
                  expected:
                    "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
                  hidden: true,
                },
              ],
            },
          ]
        }
      ]
    },
  ],
};

export const courses: Course[] = [python, c, java, javascript];

/**
 * 온보딩 진단 테스트 문항 (01번 문서).
 * 실행 채점(WRITE/BUGFIX)은 시간이 오래 걸려 온보딩 이탈을 유발하므로 제외하고,
 * 출력 예측(SELECT)과 라인 재배열(PARSONS)만으로 구성한다.
 */
export const diagnosticChallenges: Record<Language, Challenge[]> = {
  python: [
    {
      id: "diag-py-1",
      conceptTags: ["operator"],
      type: "SELECT",
      language: "python",
      question: "출력은?",
      codeSnippet: "print(2 + 3 * 2)",
      explanation: "곱셈이 덧셈보다 먼저 계산됩니다. 3 * 2 = 6, 2 + 6 = 8.",
      options: [
        { id: "a", text: "8", correct: true },
        { id: "b", text: "10", correct: false },
        { id: "c", text: "12", correct: false },
        { id: "d", text: "2 + 3 * 2", correct: false },
      ],
    },
    {
      id: "diag-py-2",
      conceptTags: ["string", "variable"],
      type: "SELECT",
      language: "python",
      question: "출력은?",
      codeSnippet: 'name = "코리"\nprint("안녕, " + name)',
      explanation: "+ 로 문자열을 이어 붙이면 '안녕, 코리' 가 됩니다.",
      options: [
        { id: "a", text: "안녕, 코리", correct: true },
        { id: "b", text: "안녕, name", correct: false },
        { id: "c", text: "안녕, + 코리", correct: false },
        { id: "d", text: "오류가 납니다", correct: false },
      ],
    },
    {
      id: "diag-py-3",
      conceptTags: ["loop"],
      type: "SELECT",
      language: "python",
      question: "출력은?",
      codeSnippet: "for i in range(3):\n    print(i)",
      explanation: "range(3)은 0, 1, 2를 순서대로 줍니다. 3은 포함되지 않습니다.",
      options: [
        { id: "a", text: "0 1 2 (줄바꿈으로 각각)", correct: true },
        { id: "b", text: "1 2 3 (줄바꿈으로 각각)", correct: false },
        { id: "c", text: "0 1 2 3 (줄바꿈으로 각각)", correct: false },
        { id: "d", text: "3", correct: false },
      ],
    },
    {
      id: "diag-py-4",
      conceptTags: ["condition"],
      type: "PARSONS",
      language: "python",
      question: "점수가 60점 이상이면 '합격'을, 아니면 '불합격'을 출력하도록 순서를 맞추세요.",
      explanation: "조건을 먼저 검사하고, if 블록과 else 블록을 들여쓰기로 구분합니다.",
      parsonsLines: [
        "score = 75",
        "if score >= 60:",
        '    print("합격")',
        "else:",
        '    print("불합격")',
      ],
    },
    {
      id: "diag-py-5",
      conceptTags: ["list"],
      type: "SELECT",
      language: "python",
      question: "출력은?",
      codeSnippet: "nums = [10, 20, 30]\nprint(nums[1])",
      explanation: "리스트 인덱스는 0부터 시작하므로 nums[1]은 두 번째 값인 20입니다.",
      options: [
        { id: "a", text: "20", correct: true },
        { id: "b", text: "10", correct: false },
        { id: "c", text: "30", correct: false },
        { id: "d", text: "[10, 20, 30]", correct: false },
      ],
    },
    {
      id: "diag-py-6",
      conceptTags: ["function"],
      type: "SELECT",
      language: "python",
      question: "출력은?",
      codeSnippet: "def double(n):\n    return n * 2\n\nprint(double(4) + 1)",
      explanation: "double(4)가 8을 반환하고, 거기에 1을 더해 9가 됩니다.",
      options: [
        { id: "a", text: "9", correct: true },
        { id: "b", text: "10", correct: false },
        { id: "c", text: "8", correct: false },
        { id: "d", text: "5", correct: false },
      ],
    },
  ],
  c: [
    {
      id: "diag-c-1",
      conceptTags: ["operator"],
      type: "SELECT",
      language: "c",
      question: "출력은?",
      codeSnippet: 'printf("%d\\n", 10 % 3);',
      explanation: "%는 나머지 연산자입니다. 10을 3으로 나눈 나머지는 1입니다.",
      options: [
        { id: "a", text: "1", correct: true },
        { id: "b", text: "3", correct: false },
        { id: "c", text: "3.33", correct: false },
        { id: "d", text: "0", correct: false },
      ],
    },
    {
      id: "diag-c-2",
      conceptTags: ["output", "variable"],
      type: "SELECT",
      language: "c",
      question: "실수(float)를 출력할 때 쓰는 형식 지정자는?",
      explanation: "%d는 정수, %f는 실수, %c는 문자, %s는 문자열에 씁니다.",
      options: [
        { id: "a", text: "%f", correct: true, code: true },
        { id: "b", text: "%d", correct: false, code: true },
        { id: "c", text: "%s", correct: false, code: true },
        { id: "d", text: "%c", correct: false, code: true },
      ],
    },
    {
      id: "diag-c-3",
      conceptTags: ["list"],
      type: "SELECT",
      language: "c",
      question: "출력은?",
      codeSnippet: 'int arr[3] = {5, 6, 7};\nprintf("%d\\n", arr[2]);',
      explanation: "배열 인덱스는 0부터 시작하므로 arr[2]는 세 번째 값인 7입니다.",
      options: [
        { id: "a", text: "7", correct: true },
        { id: "b", text: "6", correct: false },
        { id: "c", text: "5", correct: false },
        { id: "d", text: "쓰레기 값", correct: false },
      ],
    },
    {
      id: "diag-c-4",
      conceptTags: ["loop"],
      type: "PARSONS",
      language: "c",
      question: "0부터 2까지 출력하는 완전한 C 프로그램이 되도록 순서를 맞추세요.",
      explanation:
        "헤더 포함 → main 시작 → for 반복 → 반복 종료 → 반환 → main 닫기 순서입니다.",
      parsonsLines: [
        "#include <stdio.h>",
        "int main(void) {",
        "    for (int i = 0; i < 3; i++) {",
        '        printf("%d\\n", i);',
        "    }",
        "    return 0;",
        "}",
      ],
    },
    {
      id: "diag-c-5",
      conceptTags: ["pointer"],
      type: "SELECT",
      language: "c",
      question: "출력은?",
      codeSnippet: 'int x = 3;\nint *p = &x;\n*p = 9;\nprintf("%d\\n", x);',
      explanation:
        "p는 x를 가리키므로 *p = 9 는 x 자체를 9로 바꿉니다. 포인터의 핵심입니다.",
      options: [
        { id: "a", text: "9", correct: true },
        { id: "b", text: "3", correct: false },
        { id: "c", text: "x의 주소값", correct: false },
        { id: "d", text: "오류가 납니다", correct: false },
      ],
    },
    {
      id: "diag-c-6",
      conceptTags: ["memory"],
      type: "SELECT",
      language: "c",
      question: "malloc으로 할당한 메모리를 해제하지 않으면 생기는 문제는?",
      explanation:
        "해제하지 않은 메모리는 프로그램이 끝날 때까지 반환되지 않습니다. 이를 메모리 누수라고 합니다.",
      options: [
        { id: "a", text: "메모리 누수", correct: true },
        { id: "b", text: "컴파일 에러", correct: false },
        { id: "c", text: "무한 루프", correct: false },
        { id: "d", text: "아무 문제 없음", correct: false },
      ],
    },
  ],
  java: [
    {
      id: "diag-java-1",
      conceptTags: ["output"],
      type: "SELECT",
      language: "java",
      question: "출력은?",
      codeSnippet: 'System.out.println(2 + 3 * 2);',
      explanation: "곱셈이 덧셈보다 먼저입니다. 3 * 2 = 6, 2 + 6 = 8.",
      options: [
        { id: "a", text: "8", correct: true },
        { id: "b", text: "10", correct: false },
        { id: "c", text: "12", correct: false },
        { id: "d", text: "232", correct: false },
      ],
    },
    {
      id: "diag-java-2",
      conceptTags: ["variable", "operator"],
      type: "SELECT",
      language: "java",
      question: "출력은?",
      codeSnippet: 'String s = "코리";\nSystem.out.println("안녕, " + s);',
      explanation: "+ 로 문자열을 이어 붙이면 '안녕, 코리' 가 됩니다.",
      options: [
        { id: "a", text: "안녕, 코리", correct: true },
        { id: "b", text: "안녕, s", correct: false },
        { id: "c", text: "안녕, + 코리", correct: false },
        { id: "d", text: "컴파일 오류", correct: false },
      ],
    },
    {
      id: "diag-java-3",
      conceptTags: ["loop"],
      type: "SELECT",
      language: "java",
      question: "출력은?",
      codeSnippet:
        "for (int i = 0; i < 3; i++) {\n    System.out.println(i);\n}",
      explanation: "i 가 0, 1, 2 일 때 각각 출력하고 3에서 멈춥니다.",
      options: [
        { id: "a", text: "0 1 2 (줄바꿈으로 각각)", correct: true },
        { id: "b", text: "1 2 3 (줄바꿈으로 각각)", correct: false },
        { id: "c", text: "0 1 2 3 (줄바꿈으로 각각)", correct: false },
        { id: "d", text: "3", correct: false },
      ],
    },
    {
      id: "diag-java-4",
      conceptTags: ["condition"],
      type: "PARSONS",
      language: "java",
      question: "점수가 60 이상이면 '합격'을, 아니면 '불합격'을 출력하도록 순서를 맞추세요.",
      explanation: "조건을 먼저 검사하고, if 블록과 else 블록을 중괄호로 구분합니다.",
      parsonsLines: [
        "int score = 75;",
        "if (score >= 60) {",
        '    System.out.println("합격");',
        "} else {",
        '    System.out.println("불합격");',
        "}",
      ],
    },
    {
      id: "diag-java-5",
      conceptTags: ["list"],
      type: "SELECT",
      language: "java",
      question: "출력은?",
      codeSnippet:
        "int[] arr = {5, 6, 7};\nSystem.out.println(arr[1]);",
      explanation: "배열 인덱스는 0부터 시작하므로 arr[1]은 두 번째 값인 6입니다.",
      options: [
        { id: "a", text: "6", correct: true },
        { id: "b", text: "5", correct: false },
        { id: "c", text: "7", correct: false },
        { id: "d", text: "{5, 6, 7}", correct: false },
      ],
    },
  ],
  javascript: [
    {
      id: "diag-js-1",
      conceptTags: ["operator"],
      type: "SELECT",
      language: "javascript",
      question: "출력은?",
      codeSnippet: "console.log(2 + 3 * 2);",
      explanation: "곱셈이 덧셈보다 먼저입니다. 3 * 2 = 6, 2 + 6 = 8.",
      options: [
        { id: "a", text: "8", correct: true },
        { id: "b", text: "10", correct: false },
        { id: "c", text: "12", correct: false },
        { id: "d", text: "232", correct: false },
      ],
    },
    {
      id: "diag-js-2",
      conceptTags: ["variable", "operator"],
      type: "SELECT",
      language: "javascript",
      question: "출력은?",
      codeSnippet: 'console.log("5" + 3);',
      explanation:
        '문자열 "5" 에 숫자를 + 하면 문자열로 이어 붙습니다. "5" + 3 → "53".',
      options: [
        { id: "a", text: "53", correct: true },
        { id: "b", text: "8", correct: false },
        { id: "c", text: "5 3", correct: false },
        { id: "d", text: "NaN", correct: false },
      ],
    },
    {
      id: "diag-js-3",
      conceptTags: ["list"],
      type: "SELECT",
      language: "javascript",
      question: "출력은?",
      codeSnippet: "const nums = [10, 20, 30];\nconsole.log(nums[1]);",
      explanation: "배열 인덱스는 0부터 시작하므로 nums[1]은 두 번째 값인 20입니다.",
      options: [
        { id: "a", text: "20", correct: true },
        { id: "b", text: "10", correct: false },
        { id: "c", text: "30", correct: false },
        { id: "d", text: "[10, 20, 30]", correct: false },
      ],
    },
    {
      id: "diag-js-4",
      conceptTags: ["condition"],
      type: "PARSONS",
      language: "javascript",
      question: "점수가 60 이상이면 '합격'을, 아니면 '불합격'을 출력하도록 순서를 맞추세요.",
      explanation: "조건을 먼저 검사하고, if 블록과 else 블록을 중괄호로 구분합니다.",
      parsonsLines: [
        "const score = 75;",
        "if (score >= 60) {",
        '  console.log("합격");',
        "} else {",
        '  console.log("불합격");',
        "}",
      ],
    },
    {
      id: "diag-js-5",
      conceptTags: ["function"],
      type: "SELECT",
      language: "javascript",
      question: "출력은?",
      codeSnippet:
        "function double(n) {\n  return n * 2;\n}\nconsole.log(double(4) + 1);",
      explanation: "double(4) 가 8을 반환하고, 거기에 1을 더해 9가 됩니다.",
      options: [
        { id: "a", text: "9", correct: true },
        { id: "b", text: "10", correct: false },
        { id: "c", text: "8", correct: false },
        { id: "d", text: "5", correct: false },
      ],
    },
  ],
};

/**
 * 진단 정답률 → 시작 지점.
 * 80%+ 3번째 유닛 / 50~80% 2번째 / 미만 1번째. (코스의 유닛 수보다 크면 마지막 유닛으로 clamp)
 * 건너뛴 유닛의 레슨들은 completedLessons에 미리 채워서 기존 Learn.tsx 진행도 로직을 그대로 쓴다.
 */
export const placementFor = (course: Course, accuracy: number) => {
  const desired = accuracy >= 0.8 ? 2 : accuracy >= 0.5 ? 1 : 0;
  const unitIdx = Math.min(desired, course.units.length - 1);
  const startingUnit = course.units[unitIdx];
  const unlockedLessonIds = course.units
    .slice(0, unitIdx)
    .flatMap((u) => u.lessons.map((l) => l.id));
  return { startingUnit, unitIdx, unlockedLessonIds };
};

export const courseById = (id: string): Course =>
  courses.find((co) => co.id === id) ?? python;

export const allLessons = () =>
  courses.flatMap((co) =>
    co.units.flatMap((u) => u.lessons.map((l) => ({ course: co, unit: u, lesson: l })))
  );

export const findLesson = (lessonId: string) =>
  allLessons().find((x) => x.lesson.id === lessonId);

/** 코스·진단을 통틀어 모든 문제 (취약 개념 태그 매핑용) */
export const allChallenges = (): Challenge[] => [
  ...allLessons().flatMap((x) => x.lesson.challenges),
  ...Object.values(diagnosticChallenges).flat(),
];

/** 오답노트용 — 문제 id로 문제 자체와 그 문제가 속한 레슨을 함께 찾는다 (재도전 링크에 필요) */
export const findChallengeContext = (challengeId: string) => {
  for (const { course, unit, lesson } of allLessons()) {
    const challenge = lesson.challenges.find((c) => c.id === challengeId);
    if (challenge) return { course, unit, lesson, challenge };
  }
  return undefined;
};
