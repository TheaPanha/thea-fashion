# ស្នាដៃសិប្បកម្មខ្មែរ

គេហទំព័រលក់ទំនិញសិប្បកម្ម ដែលការកម្មង់ផ្ញើចូល Telegram Bot ដោយស្វ័យប្រវត្តិ។

## ឯកសារ

| ឯកសារ | តួនាទី |
|---|---|
| `index.html` | គេហទំព័រ (កាតទំនិញ 32 និងប្រអប់កម្មង់) |
| `worker.js` | Cloudflare Worker ទទួលការកម្មង់ ហើយផ្ញើទៅ Telegram |
| `Example1.jpg` ដល់ `Example32.jpg` | រូបទំនិញ (ត្រូវរៀបចំដោយខ្លួនឯង) |

## ជំហានទី 1៖ យក BOT_TOKEN និង CHAT_ID

### BOT_TOKEN

1. បើក Telegram ហើយស្វែងរក **@BotFather** (ត្រូវមានសញ្ញាធីកពណ៌ខៀវ)
2. ផ្ញើ `/newbot`
3. វាយឈ្មោះ bot ឧ. `Khmer Craft Shop`
4. វាយ username ដែលត្រូវបញ្ចប់ដោយ `bot` ឧ. `khmercraft_order_bot`
5. BotFather នឹងផ្ញើ token មក ទម្រង់ដូច `123456789:ABCdefGhIJKlmNoPQRstuVWXyz`
6. ចម្លងទុក ហើយរក្សាជាសម្ងាត់ កុំផ្ញើឱ្យអ្នកដទៃ

### CHAT_ID (ឆាតផ្ទាល់ខ្លួន)

1. ស្វែងរក bot ថ្មីរបស់អ្នក ចុច **Start** ហើយផ្ញើសារអ្វីមួយ (សំខាន់ បើមិនធ្វើទេ bot ផ្ញើសារមកអ្នកមិនបាន)
2. ស្វែងរក **@userinfobot** ហើយចុច Start
3. វានឹងឆ្លើយតបជាមួយ **Id** ជាលេខ ឧ. `123456789`
4. លេខនោះគឺ CHAT_ID របស់អ្នក

### CHAT_ID (ក្រុម Group)

1. បង្កើតក្រុម ហើយបន្ថែម bot ចូលក្រុម
2. បន្ថែម **@userinfobot** ឬ **@RawDataBot** ចូលក្រុមបណ្តោះអាសន្ន ដើម្បីមើលលេខក្រុម
3. CHAT_ID របស់ក្រុមជាលេខអវិជ្ជមាន ឧ. `-100123456789`

## ជំហានទី 2៖ Deploy Worker

1. ចូល [dash.cloudflare.com](https://dash.cloudflare.com) (គណនីឥតគិតថ្លៃ)
2. **Workers & Pages** → **Create** → **Create Worker** → **Deploy**
3. **Edit code** → បិទភ្ជាប់កូដពី `worker.js` → **Deploy**
4. **Settings** → **Variables and Secrets** បន្ថែម៖
   - `BOT_TOKEN` (ប្រភេទ Secret)
   - `CHAT_ID` (ប្រភេទ Text)
5. ចម្លង URL របស់ Worker ឧ. `https://order.xxx.workers.dev`

## ជំហានទី 3៖ កែ index.html

ប្តូរខ្សែនេះក្នុង `<script>` ជា URL ពិតរបស់ Worker៖

```js
const ORDER_ENDPOINT = "https://YOUR-WORKER.workers.dev";
```

## ជំហានទី 4៖ Deploy គេហទំព័រ

1. ដាក់ `index.html` និងរូបទាំងអស់ក្នុងថតតែមួយ
2. **Workers & Pages** → **Create** → **Pages** → **Upload assets** → អូសថតចូល → **Deploy**
3. ទទួលបានតំណ `https://ឈ្មោះ.pages.dev`

(ជម្រើសផ្សេង៖ Netlify Drop ឬ GitHub Pages)

## ជំហានទី 5៖ សុវត្ថិភាព

បន្ថែម Variable ក្នុង Worker ឈ្មោះ `ALLOWED_ORIGIN` តម្លៃជាតំណគេហទំព័រ ឧ. `https://ឈ្មោះ.pages.dev` ដើម្បីកុំឱ្យគេហទំព័រផ្សេងប្រើ Worker អ្នកបាន។

## សាកល្បង

កម្មង់ម្តងលើទូរស័ព្ទ ហើយមើលថាសារចូល Telegram ឬអត់។

## កែទិន្នន័យទំនិញ

ក្នុង `index.html` រកអារេ `PRODUCTS` ហើយកែ `name`, `place`, `price`។ ទំនិញទី N ប្រើរូប `ExampleN.jpg`។
