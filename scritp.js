let serial = 0,
  sigDataURL = "";
try {
  serial = parseInt(sessionStorage.getItem("amfS5") || "0");
} catch (e) {}
document.getElementById("fDate").value = new Date().toISOString().split("T")[0];

function bn(n) {
  return String(n).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
}
function fmtDate(s) {
  if (!s) return "";
  const [y, m, d] = s.split("-");
  const mn = [
    "",
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  return bn(parseInt(d)) + " " + mn[parseInt(m)] + ", " + bn(y);
}
function loadSig(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    sigDataURL = e.target.result;
    document.getElementById("sigPreviewImg").src = sigDataURL;
    document.getElementById("sigPreviewWrap").style.display = "block";
  };
  reader.readAsDataURL(file);
}
function removeSig() {
  sigDataURL = "";
  document.getElementById("sigInput").value = "";
  document.getElementById("sigPreviewImg").src = "";
  document.getElementById("sigPreviewWrap").style.display = "none";
}
function generate() {
  const name = document.getElementById("fName").value.trim();
  const month = document.getElementById("fMonth").value;
  const date = document.getElementById("fDate").value;
  const amt = document.getElementById("fAmount").value.trim();
  const bal = document.getElementById("fBalance").value.trim();
  if (!name || !amt || !date) {
    alert("নাম, তারিখ ও পরিমাণ অবশ্যই দিতে হবে।");
    return;
  }
  serial++;
  try {
    sessionStorage.setItem("amfS5", serial);
  } catch (e) {}
  document.getElementById("rSerial").textContent = "রশিদ নং: " + bn(serial);
  document.getElementById("rDateBadge").textContent = fmtDate(date);
  document.getElementById("rName").textContent = name;
  document.getElementById("rMonth").textContent = month;
  document.getElementById("rDate").textContent = fmtDate(date);
  document.getElementById("rAmount").textContent =
    "৳ " + bn(parseInt(amt).toLocaleString("en"));
  document.getElementById("rBalance").textContent = bal
    ? "মোট স্থিতি: ৳ " + bn(parseInt(bal).toLocaleString("en"))
    : "";
  const si = document.getElementById("rSigImg");
  if (sigDataURL) {
    si.src = sigDataURL;
    si.style.display = "block";
  } else {
    si.src = "";
    si.style.display = "none";
  }
  document.getElementById("formPanel").style.display = "none";
  document.getElementById("previewPanel").classList.add("show");
}
function goBack() {
  document.getElementById("formPanel").style.display = "block";
  document.getElementById("previewPanel").classList.remove("show");
  ["fName", "fAmount", "fBalance"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
}
function doPrint() {
  const h = document.getElementById("theReceipt").outerHTML;
  const name = document.getElementById("rName").textContent || "receipt";
  const w = window.open("", "_blank");
  w.document
    .write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>রশিদ — আল মাকাম ফাউন্ডেশন</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;margin:0;padding:0;}
  body{background:#f5f5f0;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Noto Sans Bengali',sans-serif;padding:30px;}
  .receipt{background:#fff;color:#111;font-family:'Noto Sans Bengali',sans-serif;border:1px solid #c8c0a8;border-radius:4px;overflow:hidden;max-width:560px;width:100%;}
  .r-top-stripe{height:6px;background:#1B5E20;}.r-inner{padding:1.75rem 2rem 1.5rem;}
  .r-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.25rem;}
  .r-bismillah{font-size:12px;color:#6b6b6b;margin-bottom:3px;}.r-org{font-size:20px;font-weight:700;color:#1B5E20;line-height:1.1;margin-bottom:2px;}
  .r-addr{font-size:12px;color:#7a7a7a;}.r-badge-block{text-align:right;}
  .r-badge{display:inline-block;background:#1B5E20;color:#fff;font-size:13px;font-weight:600;padding:5px 14px;border-radius:3px;margin-bottom:6px;}
  .r-serial{font-size:11px;color:#888;text-align:right;}.r-divider-top{border:none;border-top:2px solid #1B5E20;margin:0 0 1.25rem;}
  .r-field{display:flex;align-items:baseline;gap:6px;margin-bottom:0.85rem;}
  .r-label{font-size:13px;font-weight:600;color:#444;white-space:nowrap;flex-shrink:0;}.r-val{font-size:13px;color:#111;font-weight:500;}
  .r-two{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:0.85rem;}
  .r-amount-box{background:#F1F8E9;border:1px solid #A5D6A7;border-radius:4px;padding:10px 14px;margin:0.5rem 0 0.9rem;}
  .r-amount-label{font-size:11px;color:#2E7D32;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;}
  .r-amount-val{font-size:22px;font-weight:700;color:#1B5E20;}.r-amount-sub{font-size:11px;color:#5a8a5a;margin-top:1px;}
  .r-footer{display:flex;justify-content:space-between;align-items:flex-end;margin-top:1.25rem;padding-top:0.75rem;border-top:0.5px solid #d8d0be;}
  .r-sig-block{text-align:right;}.r-sig-img{display:block;max-height:52px;max-width:130px;object-fit:contain;margin-left:auto;margin-bottom:4px;}
  .r-sig-line{width:120px;border-bottom:1px solid #888;margin-bottom:4px;margin-left:auto;}
  .r-sig-label{font-size:11px;color:#666;}.r-sig-org{font-size:12px;font-weight:600;color:#1B5E20;margin-top:1px;}
  .r-bottom-stripe{height:4px;background:#A5D6A7;}
  @media print{body{background:#fff;padding:0;display:block;}.receipt{max-width:100%;border:1px solid #ccc;}}</style>
  </head><body>${h}</body></html>`);
  w.document.close();
  w.onload = () => {
    w.focus();
    w.print();
  };
}

async function downloadImage() {
  const btn = document.getElementById("imgBtn");
  const dot = document.getElementById("loadDot");
  btn.disabled = true;
  dot.style.display = "block";
  btn.childNodes[0].textContent = "⏳ তৈরি হচ্ছে...";

  try {
    const el = document.getElementById("theReceipt");
    const canvas = await html2canvas(el, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });
    const link = document.createElement("a");
    const name = (
      document.getElementById("rName").textContent || "receipt"
    ).replace(/\s+/g, "_");
    const month = document.getElementById("rMonth").textContent || "";
    link.download = `রশিদ_${name}_${month}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (err) {
    alert("Image তৈরিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
  }

  btn.disabled = false;
  dot.style.display = "none";
  btn.childNodes[0].textContent = "🖼️ Image সেভ";
}
