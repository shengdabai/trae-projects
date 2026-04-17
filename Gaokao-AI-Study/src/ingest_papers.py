import os
import glob
try:
    import pdfplumber
except ImportError:
    print("请先安装 pdfplumber: pip install pdfplumber")
    exit(1)

def ingest_papers():
    # 定义路径
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    papers_dir = os.path.join(base_dir, 'knowledge_base', 'papers')
    output_dir = os.path.join(base_dir, 'knowledge_base', 'processed_text')
    
    # 确保输出目录存在
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    # 查找所有PDF文件
    pdf_files = glob.glob(os.path.join(papers_dir, '*.pdf'))
    
    if not pdf_files:
        print(f"在 {papers_dir} 中没有找到PDF文件。")
        print("请将你的高考试卷PDF文件放入该文件夹中。")
        return

    print(f"找到 {len(pdf_files)} 个PDF文件，开始处理...")
    
    for pdf_path in pdf_files:
        filename = os.path.basename(pdf_path)
        txt_filename = filename.replace('.pdf', '.txt')
        output_path = os.path.join(output_dir, txt_filename)
        
        # 如果已经处理过，跳过（除非强制刷新，这里简单起见先跳过）
        if os.path.exists(output_path):
            print(f"跳过已存在的文件: {filename}")
            continue
            
        print(f"正在解析: {filename} ...")
        
        try:
            text_content = []
            with pdfplumber.open(pdf_path) as pdf:
                for page in pdf.pages:
                    text = page.extract_text()
                    if text:
                        text_content.append(text)
            
            full_text = "\n\n".join(text_content)
            
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(full_text)
                
            print(f"✅ 完成: {txt_filename}")
            
        except Exception as e:
            print(f"❌ 处理 {filename} 时出错: {str(e)}")

    print("\n所有文件处理完毕！你现在可以开始向AI提问了。")

if __name__ == "__main__":
    ingest_papers()
