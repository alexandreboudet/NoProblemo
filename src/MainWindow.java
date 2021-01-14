import javax.swing.JFrame;

public class MainWindow extends JFrame {
	
	public MainWindow(){
		super();
		build();
	}
 
	private void build(){
		setTitle("Ma première fenêtre");
		setSize(320,240);
		setLocationRelativeTo(null);
		setResizable(false);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}
}
