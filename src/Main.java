import javax.swing.SwingUtilities;

public class Main {
	
	public static void main(String[] args){
		SwingUtilities.invokeLater(new Runnable(){
			public void run(){
				MainWindow mainFenetre = new MainWindow();
				mainFenetre.setVisible(true);
			}
		});
	}
}
