import type { Challenge, Course, Language } from "./types";

/**
 * 코드런 학습 콘텐츠 (초안).
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
              codeSnippet: 'print("코드런")',
              explanation:
                "print() 는 괄호 안의 값을 화면에 출력합니다. 문자열의 따옴표는 출력되지 않습니다.",
              options: [
                { id: "a", text: "코드런", correct: true },
                { id: "b", text: '"코드런"', correct: false },
                { id: "c", text: "print(코드런)", correct: false },
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
              question: "정확히 다음 한 줄을 출력하는 프로그램을 작성하세요:  안녕, 코드런!",
              explanation:
                'print("안녕, 코드런!") 처럼 문자열을 그대로 출력하면 됩니다.',
              starterCode: "# 여기에 코드를 작성하세요\n",
              testCases: [{ expected: "안녕, 코드런!" }],
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
          ],
        },
      ],
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
          ],
        },
      ],
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
              codeSnippet: 'System.out.println("코드런");',
              explanation:
                "System.out.println() 은 괄호 안의 값을 출력하고 줄을 바꿉니다. 큰따옴표는 출력되지 않습니다.",
              options: [
                { id: "a", text: "코드런", correct: true },
                { id: "b", text: '"코드런"', correct: false },
                { id: "c", text: "System.out.println(코드런)", correct: false },
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
          ],
        },
      ],
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
              codeSnippet: 'console.log("코드런");',
              explanation:
                "console.log() 는 괄호 안의 값을 출력합니다. 따옴표는 출력되지 않습니다.",
              options: [
                { id: "a", text: "코드런", correct: true },
                { id: "b", text: '"코드런"', correct: false },
                { id: "c", text: "console.log(코드런)", correct: false },
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
                "정확히 다음 한 줄을 출력하는 프로그램을 작성하세요:  안녕, 코드런!",
              explanation: 'console.log("안녕, 코드런!") 처럼 문자열을 그대로 출력하면 됩니다.',
              starterCode: "// 여기에 코드를 작성하세요\n",
              testCases: [{ expected: "안녕, 코드런!" }],
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
          ],
        },
      ],
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
