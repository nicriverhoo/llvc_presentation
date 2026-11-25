const records = {
  "pairs": {
    "中文 · P501": [
      "P501_C_chinese_f1",
      "P501_C_chinese_m1"
    ],
    "英文 · P501": [
      "P501_C_english_f1",
      "P501_C_english_m1"
    ],
    "日文 · P501": [
      "P501_C_japanese_f1",
      "P501_C_japanese_m1"
    ],
    "Ch 系列": [
      "Ch_f1",
      "Ch_m1"
    ],
    "英文 · s 系列": [
      "s10_en_female",
      "s1_en_male"
    ]
  },
  "cases": [
    {
      "id": "algorithms",
      "title": "同一句话，三条转换链",
      "nav": "跨算法",
      "groups": [
        "中文 · P501",
        "英文 · P501",
        "日文 · P501",
        "Ch 系列"
      ],
      "rows": [
        {
          "model": "llvc",
          "index": 0
        },
        {
          "model": "rvc-no-f0",
          "index": 0
        },
        {
          "model": "quickvc",
          "index": 0
        }
      ],
      "design": "固定输入，选择三种算法的默认权重。先听同一列的三种流式输出，再对每个模型比较两种模式。",
      "listen": "留意词首辅音、长元音以及停顿后的第一声。三条链的目标音色和输出采样率各有差异。"
    },
    {
      "id": "generators",
      "title": "同一算法，三套 LLVC 生成器",
      "nav": "LLVC 权重",
      "groups": [
        "Ch 系列",
        "中文 · P501",
        "英文 · s 系列"
      ],
      "rows": [
        {
          "model": "llvc",
          "index": 0
        },
        {
          "model": "llvc-hfg",
          "index": 0
        },
        {
          "model": "llvc-nc",
          "index": 0
        }
      ],
      "design": "三套权重均以 16 kHz 输出，流式每块新增 13 ms。固定一句、固定模式，沿列比较标准、HFG 和 NC。",
      "listen": "先比较非流式吐字和气声，再对同一权重切换模式。HFG 指训练时使用的判别器，NC 关闭卷积前置网络。"
    },
    {
      "id": "pitch",
      "title": "RVC 的两条音高路径",
      "nav": "RVC 音高条件",
      "groups": [
        "中文 · P501",
        "日文 · P501",
        "英文 · s 系列"
      ],
      "rows": [
        {
          "model": "rvc-no-f0",
          "index": 0
        },
        {
          "model": "rvc-teacher",
          "index": 0
        }
      ],
      "design": "两套 f_8312 权重均用 ContentVec，输出 32 kHz，目标为女声且关闭索引。先听女输入，两行都移调 0 半音。",
      "listen": "再听男输入：无 F0 路径保持 0，RMVPE 路径升 12 半音。两行也更换了权重和说话人 ID（0 / 1），听到的是两条实际推理路径的综合差异。"
    },
    {
      "id": "voices",
      "title": "保留 RMVPE，更换目标音色",
      "nav": "RVC 音色",
      "groups": [
        "英文 · s 系列",
        "中文 · P501",
        "英文 · P501"
      ],
      "rows": [
        {
          "model": "guanguanV1",
          "index": 0
        },
        {
          "model": "keruanV1",
          "index": 0
        },
        {
          "model": "kikiV1",
          "index": 0
        },
        {
          "model": "zhanzhanv2-xi",
          "index": 0
        }
      ],
      "design": "四套音色均使用 RMVPE、speaker 0、索引比例 0。前三行是女声目标，同一输入沿列比较时移调相同。",
      "listen": "最后一行改为男声目标。女输入降 12 半音，男输入保持原调；对照原音听音色变化与发音清晰度。"
    },
    {
      "id": "index",
      "title": "同一音色，开启特征检索",
      "nav": "RVC 检索",
      "groups": [
        "英文 · P501",
        "日文 · P501"
      ],
      "rows": [
        {
          "model": "guanguanV1",
          "index": 0
        },
        {
          "model": "guanguanV1",
          "index": 0.75
        },
        {
          "model": "zhanzhanv2-xi",
          "index": 0
        },
        {
          "model": "zhanzhanv2-xi",
          "index": 0.75
        }
      ],
      "design": "分别取女声 guanguanV1 和男声 zhanzhanv2-xi。每个音色占两行，固定输入、移调和模式，只改变配套索引的混合比例。",
      "listen": "同列比较 0 与 0.75，再固定比例切换流式。英文和日文都可复查；两套音色使用各自的索引文件。"
    }
  ],
  "inputs": {
    "P501_C_chinese_f1": "audio/P501_C_chinese_f1.wav",
    "P501_C_chinese_m1": "audio/P501_C_chinese_m1.wav",
    "P501_C_english_f1": "audio/P501_C_english_f1.wav",
    "P501_C_english_m1": "audio/P501_C_english_m1.wav",
    "P501_C_japanese_f1": "audio/P501_C_japanese_f1.wav",
    "P501_C_japanese_m1": "audio/P501_C_japanese_m1.wav",
    "Ch_f1": "audio/Ch_f1.wav",
    "Ch_m1": "audio/Ch_m1.wav",
    "s10_en_female": "audio/s10_en_female.wav",
    "s1_en_male": "audio/s1_en_male.wav"
  },
  "tracks": {
    "P501_C_chinese_f1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_chinese_f1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_chinese_f1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_P501_C_chinese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_chinese_m1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_P501_C_chinese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_chinese_m1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_f1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_P501_C_english_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_f1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_P501_C_english_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_f1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_english_f1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_english_f1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_P501_C_english_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_f1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_P501_C_english_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_m1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_P501_C_english_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_m1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_P501_C_english_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_m1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_P501_C_english_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_english_m1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_P501_C_english_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_english_m1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_P501_C_english_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_m1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_P501_C_english_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_f1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_P501_C_japanese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_f1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_P501_C_japanese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_f1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_japanese_f1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_japanese_f1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_P501_C_japanese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_f1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_P501_C_japanese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_m1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_P501_C_japanese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_m1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_P501_C_japanese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_m1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_P501_C_japanese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_japanese_m1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_P501_C_japanese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_japanese_m1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_P501_C_japanese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_m1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_P501_C_japanese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_Ch_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "Ch_f1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_Ch_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "Ch_f1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_Ch_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "Ch_m1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_Ch_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "Ch_m1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|llvc-hfg|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_stream_chunk1_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|llvc-hfg|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_nonstream_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|llvc-nc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_stream_chunk1_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|llvc-nc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_nonstream_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|llvc-hfg|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_stream_chunk1_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|llvc-hfg|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_nonstream_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|llvc-nc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_stream_chunk1_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|llvc-nc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_nonstream_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|llvc-hfg|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_stream_chunk1_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|llvc-hfg|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_nonstream_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|llvc-nc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_stream_chunk1_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|llvc-nc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_nonstream_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|llvc-hfg|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_stream_chunk1_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|llvc-hfg|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_nonstream_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|llvc-nc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_stream_chunk1_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|llvc-nc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_nonstream_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "s10_en_female|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_s10_en_female.wav",
      "pitch": "",
      "hz": 16000
    },
    "s10_en_female|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_s10_en_female.wav",
      "pitch": "",
      "hz": 16000
    },
    "s10_en_female|llvc-hfg|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_stream_chunk1_s10_en_female.wav",
      "pitch": "",
      "hz": 16000
    },
    "s10_en_female|llvc-hfg|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_nonstream_s10_en_female.wav",
      "pitch": "",
      "hz": 16000
    },
    "s10_en_female|llvc-nc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_stream_chunk1_s10_en_female.wav",
      "pitch": "",
      "hz": 16000
    },
    "s10_en_female|llvc-nc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_nonstream_s10_en_female.wav",
      "pitch": "",
      "hz": 16000
    },
    "s1_en_male|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_s1_en_male.wav",
      "pitch": "",
      "hz": 16000
    },
    "s1_en_male|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_s1_en_male.wav",
      "pitch": "",
      "hz": 16000
    },
    "s1_en_male|llvc-hfg|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_stream_chunk1_s1_en_male.wav",
      "pitch": "",
      "hz": 16000
    },
    "s1_en_male|llvc-hfg|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_nonstream_s1_en_male.wav",
      "pitch": "",
      "hz": 16000
    },
    "s1_en_male|llvc-nc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_stream_chunk1_s1_en_male.wav",
      "pitch": "",
      "hz": 16000
    },
    "s1_en_male|llvc-nc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_nonstream_s1_en_male.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|rvc-teacher|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_stream_win100_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_chinese_f1|rvc-teacher|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_nonstream_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_chinese_m1|rvc-teacher|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_stream_win100_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 32000
    },
    "P501_C_chinese_m1|rvc-teacher|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_nonstream_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 32000
    },
    "P501_C_japanese_f1|rvc-teacher|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_stream_win100_idx0_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_japanese_f1|rvc-teacher|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_nonstream_idx0_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_japanese_m1|rvc-teacher|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_stream_win100_idx0_pauto_P501_C_japanese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 32000
    },
    "P501_C_japanese_m1|rvc-teacher|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_nonstream_idx0_pauto_P501_C_japanese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 32000
    },
    "s10_en_female|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "s10_en_female|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "s10_en_female|rvc-teacher|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_stream_win100_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "s10_en_female|rvc-teacher|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_nonstream_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "s1_en_male|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_s1_en_male_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "s1_en_male|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_s1_en_male_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "s1_en_male|rvc-teacher|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_stream_win100_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 32000
    },
    "s1_en_male|rvc-teacher|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_nonstream_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 32000
    },
    "s10_en_female|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "s10_en_female|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "s10_en_female|keruanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_stream_win100_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "s10_en_female|keruanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_nonstream_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "s10_en_female|kikiV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_stream_win100_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "s10_en_female|kikiV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_nonstream_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "s10_en_female|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_s10_en_female_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "s10_en_female|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_s10_en_female_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "s1_en_male|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "s1_en_male|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "s1_en_male|keruanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_stream_win100_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "s1_en_male|keruanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_nonstream_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "s1_en_male|kikiV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_stream_win100_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "s1_en_male|kikiV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_nonstream_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "s1_en_male|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_s1_en_male_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "s1_en_male|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_s1_en_male_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_f1|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_f1|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_f1|keruanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_stream_win100_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_f1|keruanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_nonstream_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_f1|kikiV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_stream_win100_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_f1|kikiV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_nonstream_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_f1|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_P501_C_chinese_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_chinese_f1|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_P501_C_chinese_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_chinese_m1|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_chinese_m1|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_chinese_m1|keruanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_stream_win100_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_chinese_m1|keruanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_nonstream_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_chinese_m1|kikiV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_stream_win100_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_chinese_m1|kikiV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_nonstream_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_chinese_m1|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_P501_C_chinese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_m1|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_P501_C_chinese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|keruanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_stream_win100_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|keruanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_nonstream_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|kikiV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_stream_win100_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|kikiV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_nonstream_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_P501_C_english_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_english_f1|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_P501_C_english_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_english_m1|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|keruanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_stream_win100_idx0_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|keruanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_nonstream_idx0_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|kikiV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_stream_win100_idx0_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|kikiV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_nonstream_idx0_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_P501_C_english_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_m1|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_P501_C_english_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|guanguanV1|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0.75_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|guanguanV1|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0.75_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|zhanzhanv2-xi|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0.75_pauto_P501_C_english_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_english_f1|zhanzhanv2-xi|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0.75_pauto_P501_C_english_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_english_m1|guanguanV1|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0.75_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|guanguanV1|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0.75_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|zhanzhanv2-xi|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0.75_pauto_P501_C_english_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_m1|zhanzhanv2-xi|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0.75_pauto_P501_C_english_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_f1|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_f1|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_f1|guanguanV1|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0.75_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_f1|guanguanV1|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0.75_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_f1|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_P501_C_japanese_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_japanese_f1|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_P501_C_japanese_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_japanese_f1|zhanzhanv2-xi|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0.75_pauto_P501_C_japanese_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_japanese_f1|zhanzhanv2-xi|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0.75_pauto_P501_C_japanese_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_japanese_m1|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_P501_C_japanese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_japanese_m1|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_P501_C_japanese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_japanese_m1|guanguanV1|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0.75_pauto_P501_C_japanese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_japanese_m1|guanguanV1|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0.75_pauto_P501_C_japanese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_japanese_m1|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_P501_C_japanese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_m1|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_P501_C_japanese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_m1|zhanzhanv2-xi|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0.75_pauto_P501_C_japanese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_m1|zhanzhanv2-xi|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0.75_pauto_P501_C_japanese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    }
  },
  "models": {
    "llvc": {
      "family": "llvc",
      "vc": "vcmodel1",
      "c": "cmodel0",
      "f": "fmodel0",
      "file": "G_500000.pth",
      "target": "unspecified"
    },
    "llvc-hfg": {
      "family": "llvc",
      "vc": "vcmodel2",
      "c": "cmodel0",
      "f": "fmodel0",
      "file": "G_500000.pth",
      "target": "unspecified"
    },
    "llvc-nc": {
      "family": "llvc",
      "vc": "vcmodel3",
      "c": "cmodel0",
      "f": "fmodel0",
      "file": "G_500000.pth",
      "target": "unspecified"
    },
    "rvc-no-f0": {
      "family": "rvc",
      "vc": "vcmodel4",
      "c": "cmodel1",
      "f": "fmodel0",
      "file": "f_8312_no_f0-300.pth",
      "target": "f"
    },
    "rvc-teacher": {
      "family": "rvc",
      "vc": "vcmodel5",
      "c": "cmodel1",
      "f": "fmodel1",
      "file": "f_8312_32k-325.pth",
      "target": "f"
    },
    "白菜357k": {
      "family": "rvc",
      "vc": "vcmodel6",
      "c": "cmodel1",
      "f": "fmodel1",
      "file": "白菜357k.pth",
      "target": "f"
    },
    "guanguanV1": {
      "family": "rvc",
      "vc": "vcmodel7",
      "c": "cmodel1",
      "f": "fmodel1",
      "file": "guanguanV1.pth",
      "target": "f"
    },
    "keruanV1": {
      "family": "rvc",
      "vc": "vcmodel8",
      "c": "cmodel1",
      "f": "fmodel1",
      "file": "keruanV1.pth",
      "target": "f"
    },
    "kikiV1": {
      "family": "rvc",
      "vc": "vcmodel9",
      "c": "cmodel1",
      "f": "fmodel1",
      "file": "kikiV1.pth",
      "target": "f"
    },
    "zhanzhanv2-xi": {
      "family": "rvc",
      "vc": "vcmodel10",
      "c": "cmodel1",
      "f": "fmodel1",
      "file": "zhanzhanv2-xi.pth",
      "target": "m"
    },
    "quickvc": {
      "family": "quickvc",
      "vc": "vcmodel11",
      "c": "cmodel2",
      "f": "fmodel0",
      "file": "quickvc_100.pth",
      "target": "unspecified"
    }
  },
  "perf": [
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc",
      "model": "llvc",
      "mode": "stream",
      "chunk_factor": "1",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "0.7453400364666534",
      "block_count": "29402",
      "chunk_ms": "13.0",
      "history_ms": "2.0",
      "history_blocks": "0.15384615384615385",
      "mean_model_ms": "9.682090939380396",
      "mean_block_ms": "9.682090939380396",
      "immediate_ms": "22.682090939380394",
      "boundary_ms": "26.0"
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc",
      "model": "llvc",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "0.055423834846263544",
      "block_count": "6",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "3529.0361833322095",
      "mean_block_ms": "3529.0361833322095",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc",
      "model": "llvc-hfg",
      "mode": "stream",
      "chunk_factor": "1",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "0.9483972261110148",
      "block_count": "29402",
      "chunk_ms": "13.0",
      "history_ms": "2.0",
      "history_blocks": "0.15384615384615385",
      "mean_model_ms": "12.32257905581508",
      "mean_block_ms": "12.32257905581508",
      "immediate_ms": "25.32257905581508",
      "boundary_ms": "26.0"
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc",
      "model": "llvc-hfg",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "0.051652650992718714",
      "block_count": "6",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "3289.0718833332357",
      "mean_block_ms": "3289.0718833332357",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc",
      "model": "llvc-nc",
      "mode": "stream",
      "chunk_factor": "1",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "0.5794146401891845",
      "block_count": "29402",
      "chunk_ms": "13.0",
      "history_ms": "2.0",
      "history_blocks": "0.15384615384615385",
      "mean_model_ms": "7.52552121283451",
      "mean_block_ms": "7.52552121283451",
      "immediate_ms": "20.525521212834512",
      "boundary_ms": "26.0"
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc",
      "model": "llvc-nc",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "0.04357573127195018",
      "block_count": "6",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "2774.6658666656003",
      "mean_block_ms": "2774.6658666656003",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc/rvc",
      "model": "rvc-no-f0",
      "mode": "stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "2.021528816967775",
      "block_count": "3819",
      "chunk_ms": "100.0",
      "history_ms": "192.0",
      "history_blocks": "1.92",
      "mean_model_ms": "201.0921054726709",
      "mean_block_ms": "202.13319821942596",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc/rvc",
      "model": "rvc-no-f0",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "0.4727444675823439",
      "block_count": "13",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "13870.677384617851",
      "mean_block_ms": "13891.974946153754",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc/rvc",
      "model": "rvc-teacher",
      "mode": "stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "2.9373707318665225",
      "block_count": "3819",
      "chunk_ms": "100.0",
      "history_ms": "192.0",
      "history_blocks": "1.92",
      "mean_model_ms": "292.13614184347534",
      "mean_block_ms": "293.7170680544219",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc/rvc",
      "model": "rvc-teacher",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "0.5152354816247527",
      "block_count": "13",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "15115.118992307263",
      "mean_block_ms": "15141.140638461646",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc/rvc",
      "model": "guanguanV1",
      "mode": "stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "3.1011195092954584",
      "block_count": "3819",
      "chunk_ms": "100.0",
      "history_ms": "192.0",
      "history_blocks": "1.92",
      "mean_model_ms": "308.5908641005079",
      "mean_block_ms": "310.0878826917848",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc/rvc",
      "model": "guanguanV1",
      "mode": "stream",
      "chunk_factor": "",
      "index_rate": "0.75",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "2.973646483372474",
      "block_count": "3819",
      "chunk_ms": "100.0",
      "history_ms": "192.0",
      "history_blocks": "1.92",
      "mean_model_ms": "295.3077814872732",
      "mean_block_ms": "297.340713301896",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc/rvc",
      "model": "guanguanV1",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "0.5948890740355695",
      "block_count": "13",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "17457.762700000712",
      "mean_block_ms": "17481.23000769164",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc/rvc",
      "model": "guanguanV1",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.75",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "0.5789871604881623",
      "block_count": "13",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "16968.681615386093",
      "mean_block_ms": "17013.592184615285",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc/rvc",
      "model": "zhanzhanv2-xi",
      "mode": "stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "3.181781170201604",
      "block_count": "3819",
      "chunk_ms": "100.0",
      "history_ms": "192.0",
      "history_blocks": "1.92",
      "mean_model_ms": "316.60747829266523",
      "mean_block_ms": "318.153745509291",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc/rvc",
      "model": "zhanzhanv2-xi",
      "mode": "stream",
      "chunk_factor": "",
      "index_rate": "0.75",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "3.2039925847084154",
      "block_count": "3819",
      "chunk_ms": "100.0",
      "history_ms": "192.0",
      "history_blocks": "1.92",
      "mean_model_ms": "317.5183762764997",
      "mean_block_ms": "320.37524315268627",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc/rvc",
      "model": "zhanzhanv2-xi",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "0.5833482225925034",
      "block_count": "13",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "17115.03053846368",
      "mean_block_ms": "17141.955769230735",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc/rvc",
      "model": "zhanzhanv2-xi",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.75",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "0.5993212864695869",
      "block_count": "13",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "17528.1023461553",
      "mean_block_ms": "17611.69160769182",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc/quickvc",
      "model": "quickvc",
      "mode": "stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "0.784921666666581",
      "block_count": "3819",
      "chunk_ms": "100.0",
      "history_ms": "92.0",
      "history_blocks": "0.92",
      "mean_model_ms": "78.27396999219206",
      "mean_block_ms": "78.48122644671157",
      "immediate_ms": "178.48122644671156",
      "boundary_ms": "200.0"
    },
    {
      "batch_group": "2026-11-20_th12",
      "algorithm": "llvc/quickvc",
      "model": "quickvc",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "12",
      "project_version": "0.1.23",
      "rtf": "0.1277394427827707",
      "block_count": "6",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "8128.432916664073",
      "mean_block_ms": "8129.461699999714",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc",
      "model": "llvc",
      "mode": "stream",
      "chunk_factor": "1",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "0.8629319739716395",
      "block_count": "29402",
      "chunk_ms": "13.0",
      "history_ms": "2.0",
      "history_blocks": "0.15384615384615385",
      "mean_model_ms": "11.209832361733705",
      "mean_block_ms": "11.209832361733705",
      "immediate_ms": "24.209832361733703",
      "boundary_ms": "26.0"
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc",
      "model": "llvc",
      "mode": "stream",
      "chunk_factor": "4",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "0.4241617781743314",
      "block_count": "7352",
      "chunk_ms": "52.0",
      "history_ms": "2.0",
      "history_blocks": "0.038461538461538464",
      "mean_model_ms": "22.03856226868309",
      "mean_block_ms": "22.03856226868309",
      "immediate_ms": "74.0385622686831",
      "boundary_ms": "104.0"
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc",
      "model": "llvc",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "0.1650178155789591",
      "block_count": "6",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "10508.848033336108",
      "mean_block_ms": "10508.848033336108",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc",
      "model": "llvc-hfg",
      "mode": "stream",
      "chunk_factor": "1",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "1.0754505276275885",
      "block_count": "29402",
      "chunk_ms": "13.0",
      "history_ms": "2.0",
      "history_blocks": "0.15384615384615385",
      "mean_model_ms": "13.972110148880967",
      "mean_block_ms": "13.972110148880967",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc",
      "model": "llvc-hfg",
      "mode": "stream",
      "chunk_factor": "4",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "0.29750371344213183",
      "block_count": "7352",
      "chunk_ms": "52.0",
      "history_ms": "2.0",
      "history_blocks": "0.038461538461538464",
      "mean_model_ms": "15.457493879297232",
      "mean_block_ms": "15.457493879297232",
      "immediate_ms": "67.45749387929723",
      "boundary_ms": "104.0"
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc",
      "model": "llvc-hfg",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "0.10837583069909434",
      "block_count": "6",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "6902.002033333702",
      "mean_block_ms": "6902.002033333702",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc",
      "model": "llvc-nc",
      "mode": "stream",
      "chunk_factor": "1",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "0.8908719024459671",
      "block_count": "29402",
      "chunk_ms": "13.0",
      "history_ms": "2.0",
      "history_blocks": "0.15384615384615385",
      "mean_model_ms": "11.571642622981905",
      "mean_block_ms": "11.571642622981905",
      "immediate_ms": "24.571642622981905",
      "boundary_ms": "26.0"
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc",
      "model": "llvc-nc",
      "mode": "stream",
      "chunk_factor": "4",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "0.2702470067351761",
      "block_count": "7352",
      "chunk_ms": "52.0",
      "history_ms": "2.0",
      "history_blocks": "0.038461538461538464",
      "mean_model_ms": "14.04081572357618",
      "mean_block_ms": "14.04081572357618",
      "immediate_ms": "66.04081572357617",
      "boundary_ms": "104.0"
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc",
      "model": "llvc-nc",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "0.1060777589644052",
      "block_count": "6",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "6755.666149998433",
      "mean_block_ms": "6755.666149998433",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc/rvc",
      "model": "rvc-no-f0",
      "mode": "stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "4.079877099238403",
      "block_count": "3819",
      "chunk_ms": "100.0",
      "history_ms": "192.0",
      "history_blocks": "1.92",
      "mean_model_ms": "406.87974763017127",
      "mean_block_ms": "407.9665033514389",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc/rvc",
      "model": "rvc-no-f0",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "1.3164215470408045",
      "block_count": "13",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "38665.73693076945",
      "mean_block_ms": "38693.75206923108",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc/rvc",
      "model": "rvc-teacher",
      "mode": "stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "4.275202517674474",
      "block_count": "3819",
      "chunk_ms": "100.0",
      "history_ms": "192.0",
      "history_blocks": "1.92",
      "mean_model_ms": "426.09396381281033",
      "mean_block_ms": "427.49903616127114",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc/rvc",
      "model": "rvc-teacher",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "0.8892389779281497",
      "block_count": "13",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "26106.880323079306",
      "mean_block_ms": "26136.142861536846",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc/rvc",
      "model": "guanguanV1",
      "mode": "stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "3.068232028278074",
      "block_count": "3819",
      "chunk_ms": "100.0",
      "history_ms": "192.0",
      "history_blocks": "1.92",
      "mean_model_ms": "305.76995014399034",
      "mean_block_ms": "306.7992138516271",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc/rvc",
      "model": "guanguanV1",
      "mode": "stream",
      "chunk_factor": "",
      "index_rate": "0.75",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "3.057310759885514",
      "block_count": "3819",
      "chunk_ms": "100.0",
      "history_ms": "192.0",
      "history_blocks": "1.92",
      "mean_model_ms": "303.985296229625",
      "mean_block_ms": "305.7071286986813",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc/rvc",
      "model": "guanguanV1",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "1.0116218011030673",
      "block_count": "13",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "29709.66629231071",
      "mean_block_ms": "29732.833207692376",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc/rvc",
      "model": "guanguanV1",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.75",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "0.9855802605709689",
      "block_count": "13",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "28920.727761541806",
      "mean_block_ms": "28967.141915383625",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc/rvc",
      "model": "zhanzhanv2-xi",
      "mode": "stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "3.155948477609891",
      "block_count": "3819",
      "chunk_ms": "100.0",
      "history_ms": "192.0",
      "history_blocks": "1.92",
      "mean_model_ms": "314.46678690736246",
      "mean_block_ms": "315.570759675113",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc/rvc",
      "model": "zhanzhanv2-xi",
      "mode": "stream",
      "chunk_factor": "",
      "index_rate": "0.75",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "3.1525143320237237",
      "block_count": "3819",
      "chunk_ms": "100.0",
      "history_ms": "192.0",
      "history_blocks": "1.92",
      "mean_model_ms": "312.7896326785939",
      "mean_block_ms": "315.22748614817925",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc/rvc",
      "model": "zhanzhanv2-xi",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "0.973978326059066",
      "block_count": "13",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "28597.413230772454",
      "mean_block_ms": "28626.26500000344",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc/rvc",
      "model": "zhanzhanv2-xi",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.75",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "0.9834192127920415",
      "block_count": "13",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "28817.2224923037",
      "mean_block_ms": "28903.869599994952",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc/quickvc",
      "model": "quickvc",
      "mode": "stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "1.216133580780321",
      "block_count": "3819",
      "chunk_ms": "100.0",
      "history_ms": "92.0",
      "history_blocks": "0.92",
      "mean_model_ms": "121.369146844937",
      "mean_block_ms": "121.60077234878501",
      "immediate_ms": "",
      "boundary_ms": ""
    },
    {
      "batch_group": "2026-11-25_th2",
      "algorithm": "llvc/quickvc",
      "model": "quickvc",
      "mode": "non-stream",
      "chunk_factor": "",
      "index_rate": "0.0",
      "torch_threads": "2",
      "project_version": "0.2.2",
      "rtf": "0.519928446205559",
      "block_count": "6",
      "chunk_ms": "",
      "history_ms": "",
      "history_blocks": "",
      "mean_model_ms": "33109.0191833379",
      "mean_block_ms": "33110.301183335345",
      "immediate_ms": "",
      "boundary_ms": ""
    }
  ]
};
